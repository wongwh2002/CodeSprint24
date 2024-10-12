import heapq
import testcase
import copy

data = testcase.case_1

class Node:
    def __init__(self, port_id, day, hour, day_start, hour_start, parent, curr_ship):
        self.port_id = port_id
        self.day = day
        self.hour = hour
        self.day_start = day_start
        self.hour_start = hour_start
        self.parent = parent
        self.curr_ship = curr_ship

    def __lt__(self, other):
        return (self.day * 24) + self.hour < (other.day * 24) + other.hour

def algo(start: Node, goal, fixed_time: dict, schedule: dict, visited: dict, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo_size):
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
                if prev_day < i[1] < next_node.day or (i[1] == prev_day and i[2] > prev_hour) or (i[1] == next_node.day and i[2] < next_node.hour):
                    if i[0]:
                        curr_ship_capacity[ship] += i[3]
                    else:
                        curr_ship_capacity[ship] -= i[3]
        neighbours = schedule[next_node.port_id]
        for neighbour in neighbours:
            if not visited[neighbour[0]]:
                if curr_ship_capacity[neighbour[3]] + cargo_size <= ship_capacity[neighbour[3]] and (neighbour[1] > next_node.day or (neighbour[1] == next_node.day and neighbour[2] > next_node.hour)):
                    duration = fixed_time[(next_node.port_id, neighbour[0])]
                    fixed_day, fixed_hour = int(duration / 24), duration % 24
                    new_node = Node(neighbour[0], neighbour[1] + fixed_day, neighbour[2] + fixed_hour, neighbour[1], neighbour[2], next_node, neighbour[3])
                    heapq.heappush(heap, new_node)
        prev_day = next_node.day
        prev_hour = next_node.hour
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
    start = Node("A", 10, 5, None, None, None, None)
    for cargo in cargo_list:
        goal = cargo_list[cargo][1]
        for i in port_list:
            visited[i] = False
        final_node = algo(start , goal, fixed_time, schedule, visited, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo_list[cargo][0])
        while final_node.parent is not None:
            hour_start = copy.deepcopy(final_node.hour_start)
            day_start = copy.deepcopy(final_node.day_start)
            ship = copy.deepcopy(final_node.curr_ship)
            print(final_node.port_id,end=" ")
            final_node = final_node.parent
            if final_node.curr_ship != ship:
                confirmed_cargo[ship].append((True, hour_start, day_start, cargo_list[cargo][0]))
                if final_node.curr_ship is not None:
                    confirmed_cargo[final_node.curr_ship].append((False, final_node.hour, final_node.day, cargo_list[cargo][0]))
        print(final_node.port_id)
    print(confirmed_cargo[1])
    print(confirmed_cargo[2])
    print(confirmed_cargo[3])

run()
