import heapq
import testcase
import copy

data = testcase.case_2

class Cargo:
    def __init__(self, size, dest, priority):
        self.size = size
        self.dest = dest
        self.priority = priority

    def __lt__(self, other):
        return self.priority < other.priority

class Node:
    def __init__(self, port_id, day, hour, day_start, hour_start, parent, curr_ship, cargo_split, cargo_size_taken):
        self.port_id = port_id
        self.day = day
        self.hour = hour
        self.day_start = day_start
        self.hour_start = hour_start
        self.parent = parent
        self.curr_ship = curr_ship
        self.cargo_split = cargo_split
        self.cargo_size_taken = cargo_size_taken

    def __lt__(self, other):
        return (self.day * 24) + self.hour < (other.day * 24) + other.hour

def algo(start: Node, fixed_time: dict, schedule: dict, visited: dict, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo_heap):
    cargo = heapq.heappop(cargo_heap)
    goal = cargo.dest
    heap = [start]
    prev_day = start.day
    prev_hour = start.hour
    while heap:
        next_node = heapq.heappop(heap)
        if next_node.port_id == goal:
            return next_node
        visited[next_node.port_id] = True
        for ship in confirmed_cargo:
            for i in confirmed_cargo[ship]:
                if prev_day < i[2] < next_node.day or (i[2] == prev_day and i[1] > prev_hour) or (i[2] == next_node.day and i[1] < next_node.hour):
                    if i[0]:
                        curr_ship_capacity[ship] += i[3]
                    else:
                        curr_ship_capacity[ship] -= i[3]
        neighbours = schedule[next_node.port_id]
        for neighbour in neighbours: #haven choose which neighbour but pushing in extra cargo nodes
            cargo_split = None
            if not visited[neighbour[0]]:
                cargo_size = cargo.size
                if curr_ship_capacity[neighbour[3]] + cargo.size > ship_capacity[neighbour[3]] > curr_ship_capacity[neighbour[3]]:
                    initial_cargo_size = copy.deepcopy(cargo.size)
                    cargo_size = ship_capacity[neighbour[3]] - curr_ship_capacity[neighbour[3]]
                    cargo_split = Cargo(initial_cargo_size - cargo_size, cargo.dest, cargo.priority)
                if curr_ship_capacity[neighbour[3]] + cargo_size <= ship_capacity[neighbour[3]] and (neighbour[1] > next_node.day or (neighbour[1] == next_node.day and neighbour[2] > next_node.hour)):
                    duration = fixed_time[(next_node.port_id, neighbour[0])]
                    fixed_day, fixed_hour = int(duration / 24), duration % 24
                    new_node = Node(neighbour[0], neighbour[1] + fixed_day + int((neighbour[2] + fixed_hour) / 24), (neighbour[2] + fixed_hour) % 24, neighbour[1], neighbour[2], next_node, neighbour[3], cargo_split, cargo_size)
                    heapq.heappush(heap, new_node)
        prev_day = copy.deepcopy(next_node.day)
        prev_hour = copy.deepcopy(next_node.hour)
    return False

def run():
    fixed_time = data["fixed_time"]
    schedule = data["schedule"]
    port_list = data["port_list"]
    ship_list = data["ship_list"]
    visited = dict()
    confirmed_cargo = dict()
    ship_capacity = data["ship_capacity"]
    curr_ship_capacity = dict()
    cargo_list = data["cargo_list"]
    for i in ship_list:
        confirmed_cargo[i] = list()
        curr_ship_capacity[i] = 0
    start = Node("A", 10, 5, None, None, None, None, None, None)
    cargo_heap = []
    for cargo in cargo_list:
        heapq.heappush(cargo_heap, Cargo(cargo_list[cargo][0], cargo_list[cargo][1], cargo_list[cargo][2]))
    while cargo_heap:
        cargo = cargo_heap[0]
        for i in port_list:
            visited[i] = False
        for i in ship_list:
            curr_ship_capacity[i] = 0
        final_node = algo(start , fixed_time, schedule, visited, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo_heap)
        while final_node.parent is not None:
            hour_start = copy.deepcopy(final_node.hour_start)
            day_start = copy.deepcopy(final_node.day_start)
            ship = copy.deepcopy(final_node.curr_ship)
            cargo_size_taken = copy.deepcopy(final_node.cargo_size_taken)
            if final_node.cargo_split:
                heapq.heappush(cargo_heap, final_node.cargo_split)
            print(final_node.port_id,end=" ")
            final_node = final_node.parent
            if final_node.curr_ship != ship:
                confirmed_cargo[ship].append((True, hour_start, day_start, cargo_size_taken))
                if final_node.curr_ship is not None:
                    confirmed_cargo[final_node.curr_ship].append((False, final_node.hour, final_node.day, cargo_size_taken))
        #if final_node.cargo_split:
        #    heapq.heappush(cargo_heap, final_node.cargo_split)
        print(final_node.port_id)
    print(confirmed_cargo[1])
    print(confirmed_cargo[2])
    print(confirmed_cargo[3])

run()
