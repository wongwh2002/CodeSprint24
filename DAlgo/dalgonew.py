import heapq
from typing import final

# import testcase
import copy

# testcase_data = testcase.case_2
final_nodes = []
confirmed_cargo = dict()

class Cargo:
    def __init__(self, size, port_to, port_from, day, hour, name):
        self.size = size
        self.port_to = port_to
        self.port_from = port_from
        self.day = day
        self.hour = hour
        self.name = name

    def __lt__(self, other):
        return self.day * 24 + self.hour < other.day * 24 + other.hour

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
#Todo: add the start positions
def algo(start: Node, goal, fixed_time: dict, schedule: dict, visited: dict, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo_size):
    heap = [start]
    while heap:
        next_node = heapq.heappop(heap)
        if next_node.port_id == goal:
            return next_node
        visited[next_node.port_id] = True
        neighbours = schedule[next_node.port_id]
        for neighbour in neighbours:
            temp_ship_cap = copy.deepcopy(curr_ship_capacity)
            for ship in confirmed_cargo:
                for i in confirmed_cargo[ship]:
                    now = neighbour[1] * 24 + neighbour[2]
                    change_time = i[2] * 24 + i[1]
                    if change_time <= now or now == change_time:
                        if i[0]:
                            temp_ship_cap[ship] += i[3]
                        else:
                            temp_ship_cap[ship] -= i[3]
            if not visited[neighbour[0]]:
                if temp_ship_cap[neighbour[3]] + cargo_size <= ship_capacity[neighbour[3]] and (neighbour[1] > next_node.day or (neighbour[1] == next_node.day and neighbour[2] >= next_node.hour)):
                    duration = fixed_time[(next_node.port_id, neighbour[0])]
                    fixed_day, fixed_hour = int(duration / 24), duration % 24
                    new_node = Node(neighbour[0], neighbour[1] + fixed_day + int((neighbour[2] + fixed_hour) / 24), (neighbour[2] + fixed_hour) % 24, neighbour[1], neighbour[2], next_node, neighbour[3])
                    heapq.heappush(heap, new_node)
    return False

def algo_congest(start: Node, goal, fixed_time: dict, schedule: dict, visited: dict, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo_size, congestion_time, congested_port, ship_id):
    to_next_port = []
    heap = [start]
    while heap:
        next_node = heapq.heappop(heap)
        if next_node.day * 24 + next_node.hour > congestion_time:
            for c in confirmed_cargo[ship_id]:
                if c[0] == False and c[1] + c[2] * 24 > congestion_time and c[5] == congested_port:
                    to_next_port.append(c[4])
                    print("congested", c[4])
        if next_node.port_id == goal:
            return next_node
        visited[next_node.port_id] = True
        neighbours = schedule[next_node.port_id]
        for neighbour in neighbours:
            temp_ship_cap = copy.deepcopy(curr_ship_capacity)
            for ship in confirmed_cargo:
                for i in confirmed_cargo[ship]:
                    now = neighbour[1] * 24 + neighbour[2]
                    change_time = i[2] * 24 + i[1]
                    if change_time <= now or now == change_time:
                        if i[0]:
                            temp_ship_cap[ship] += i[3]
                        else:
                            temp_ship_cap[ship] -= i[3]
            if not visited[neighbour[0]]:
                if temp_ship_cap[neighbour[3]] + cargo_size <= ship_capacity[neighbour[3]] and (neighbour[1] > next_node.day or (neighbour[1] == next_node.day and neighbour[2] >= next_node.hour)):
                    duration = fixed_time[(next_node.port_id, neighbour[0])]
                    fixed_day, fixed_hour = int(duration / 24), duration % 24
                    new_node = Node(neighbour[0], neighbour[1] + fixed_day + int((neighbour[2] + fixed_hour) / 24), (neighbour[2] + fixed_hour) % 24, neighbour[1], neighbour[2], next_node, neighbour[3])
                    heapq.heappush(heap, new_node)
    return False

def avg_from_deadline(test_data):
    run(test_data)
    final_nodes = get_final_nodes()

    time_taken = 0
    for final_node in final_nodes:
        end_day = final_node.day
        end_hour = final_node.hour
        time_taken -= end_day * 24 + end_hour
    for cargo in data["cargo_list"]:
        deadline_day = data["cargo_list"][cargo][3]
        deadline_hour = data["cargo_list"][cargo][4]
        time_taken += (deadline_day * 24 + deadline_hour)
    print("didnt die")
    return time_taken / len(final_nodes)

def run(data):
    fixed_time = data["fixed_time"]
    schedule = data["schedule"]
    port_list = data["port_list"]
    ship_list = data["ship_list"]
    visited = dict()
    ship_capacity = data["ship_capacity"]
    curr_ship_capacity = dict()
    cargo_list = data["cargo_list"]
    cargo_heap = []
    for cargo in cargo_list:
        heapq.heappush(cargo_heap, Cargo(cargo_list[cargo][0], cargo_list[cargo][1], cargo_list[cargo][2], cargo_list[cargo][3], cargo_list[cargo][4], cargo))
    #initialise list of cargos to take
    for i in ship_list:
        confirmed_cargo[i] = list()
        curr_ship_capacity[i] = 0
    #starting point
    while cargo_heap:
        cargo = heapq.heappop(cargo_heap)
        start = Node(cargo.port_from, 10, 10, 10, 10, None, None)
        goal = cargo.port_to
        #initialise some visited ports list??
        for i in port_list:
            visited[i] = False
        final_node = algo(start, goal, fixed_time, schedule, visited, confirmed_cargo, curr_ship_capacity, ship_capacity, cargo.size)
        final_nodes.append(final_node)
        confirmed_cargo[final_node.curr_ship].append((False, final_node.hour, final_node.day, cargo.size, cargo.name, final_node.port_id))
        # print('cargo:', cargo)
        while final_node.parent is not None:
            hour_start = copy.deepcopy(final_node.hour_start)
            day_start = copy.deepcopy(final_node.day_start)
            ship = copy.deepcopy(final_node.curr_ship)
            port_id = copy.deepcopy(final_node.port_id)
            # print(final_node.port_id, final_node.curr_ship, end=" ") #prints out path for the cargo
            final_node = final_node.parent
            if final_node.curr_ship != ship: #if it stays on the ship dont add to list
                confirmed_cargo[ship].append((True, hour_start, day_start, cargo.size, cargo.name, final_node.port_id))
                if final_node.curr_ship is not None:
                    confirmed_cargo[final_node.curr_ship].append((False, final_node.hour, final_node.day, cargo.size, cargo.name, port_id))
        # print(final_node.port_id)
        # print('got run')
        # print(confirmed_cargo[1])
        # print(confirmed_cargo[2])

def get_final_nodes():
    return final_nodes

def get_confirmed_cargo():
    return confirmed_cargo

# run(testcase_data)