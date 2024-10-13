import pygad 
import random
import heapq
import copy
from DAlgo.dalgonew import avg_from_deadline

global base2
base2 = {
    "fixed_time": {("A","B") : 1, ("B","C") : 5, ("A","C") : 2,
                    ("B","A") : 1, ("C","B") : 5, ("C","A") : 2,
                    ("A","D") : 3, ("B","D") : 3, ("C","D") : 1,
                    ("D","A") : 3, ("D","B") : 3, ("D","C") : 1},
        "start": {1: ("C", 10), 2: ("A", 10), 3: ("B", 10)},
        "port_list": ["A", "B", "C", "D"],
        "ship_capacity": {1:1, 2:2, 3:1},
        "ship_list": [1, 2, 3],        
}

cargo_data =  {"cargo_1": (1,"B", "A", 15, 1), "cargo_2": (1,"C","A", 15, 2), "cargo_3": (1, "B", "D", 15, 3), "cargo_4": (1,"A","D", 15, 4),
                    "cargo_5": (1, "C", "D", 15, 5), "cargo_6": (1,"D", "A", 15, 6)}
# change this to dijstrka later
def fitness(solution):
    #convert to dalgo form
    base_data = base2
    port_schedule = dict()
    for port in base_data['port_list']:
        port_schedule[port] = list()
    start_points = base_data['start']

    for ship in start_points:
        prev_node = start_points[ship]
        for node in solution[ship]:
            port_schedule[prev_node[0]].append((node[0], 10, node[1], ship)) #departure port, day, time , shipid
            prev_node = node

    all_data['schedule'] = port_schedule
    try:
        # print("omg it came here wow")
        time = avg_from_deadline(all_data)
        print("Average time from deadline", time)
        return time
    except:
        # print("came to exception")
        return 0

#assume the ships can js take up random schedules
def create_schedule(start, ports, time_btwn_ports, total_time): #create per ship
    elapsed_time = 0
    start_port = start[0]
    start_time = start[1]
    ship_schedule = []
    # "schedule": {"A": [("B", 10, 10, 1), ("C", 10, 12, 2)],
    while elapsed_time < total_time: #within the planning schedule
        available_ports = copy.deepcopy(ports)
        available_ports.remove(start_port)
        next_node = random.choice(available_ports)
        ship_schedule.append((next_node, start_time + elapsed_time))
        #assume no time taken to load and unload at the port
        elapsed_time += time_btwn_ports[(start_port, next_node)]
        start_port = next_node
    return ship_schedule 


def select_parent(population):
    # Tournament selection
    tournament = random.sample(population, k=5)
    tournament.sort(key=fitness, reverse=True)
    return tournament[0]

def crossover(ship_schedule1, ship_schedule2):
    #uniform cross over (mix ships from different schedules)
    #ship schedules are independent at this stage
    new_schedule1 = dict()
    new_schedule2 = dict()
    for ship in ship_schedule1:
        if random.random()<0.5:
            new_schedule1[ship] = (ship_schedule1[ship])
            new_schedule2[ship] =(ship_schedule2[ship])
        else:
            new_schedule2[ship] =(ship_schedule1[ship])
            new_schedule1[ship] =(ship_schedule2[ship])
    
    return new_schedule1, new_schedule2 

   
#population: list of schedules
#schedule: list of ship routes 
#ship_schedule: list of nodes ship visits with timings 
# time: hours from now
#[[('C', 10), ('D', 11), ('C', 12), ('B', 13)], [('A', 10), ('D', 11), ('C', 12), ('A', 13)]]
def random_mutation(ship_schedule, ports, time_limit, start_node):
    #does random mutation on a ship's schedule
    idx = random.randint(0, len(ship_schedule) - 1)
    ports_visited = set()
    for i in ship_schedule: 
        ports_visited.add(i[0])
    
    unvisited_port = []
    # print('idx:', idx)
    for port in ports:
        if port not in ports_visited: #doesnt remove starting port
            unvisited_port.append(port)
    
    available_port = copy.deepcopy(ports)
    if idx != len(ship_schedule)-1 and ship_schedule[idx+1][0] in available_port: #remove next port from available list
        available_port.remove(ship_schedule[idx+1][0])
    #remove previous port
    if idx == 0 and start_node[0] in available_port: 
        available_port.remove(start_node[0])
    elif ship_schedule[idx - 1][0] in available_port:
        available_port.remove(ship_schedule[idx - 1][0]) 
    
    if len(unvisited_port) == 0:
        new_port = random.choice([port for port in available_port])
    else:
        if idx == 0 and start_node[0] in unvisited_port: #remove start port
            unvisited_port.remove(start_node[0])
        if idx != len(ship_schedule)-1 and ship_schedule[idx+1][0] in unvisited_port: #remove next port from available list
            unvisited_port.remove(ship_schedule[idx+1])

        if len(unvisited_port) == 0:
            new_port = random.choice([port for port in available_port])
            # print("available port:", available_port)
        else:
            new_port = random.choice(unvisited_port)
            # print("unvisited port:", available_port)

    old_node = ship_schedule[idx]
    print("ship schedule", ship_schedule)
    print("old_node:", old_node, end = ' ')
    print("new port", new_port)
    new_node = (new_port, old_node[1])
    ship_schedule[idx] = new_node

    #update times of all other paths
    prev_node = new_node
    time = new_node[1]
    for i in range(idx + 1, len(ship_schedule)):
        # print("current node", ship_schedule[i])
        port = ship_schedule[i][0]
        time += time_btwn_ports[(prev_node[0], port)]
        ship_schedule[i] = (port, time)
        prev_node = ship_schedule[i]
    return ship_schedule

def mutate(ships, schedule, ports, time_limit, start_points):
    if random.random() < MUTATION_RATE:
        print("Mutated")
        ship_id = random.choice(ships)
        # possibly change mutation strategy based on diversity of nodes? #
        # like if not diverse then mutate it by adding the new alternative location? 
        # then if pretty diverse, use scramble mutation?
        # print("Previous", schedule[ship_id])
        start_node = start_points[ship_id]
        # print("schedule", schedule)
        schedule[ship_id] = random_mutation(schedule[ship_id], ports, time_limit, start_node)
        # print("Mutated", schedule[ship_id])
    return schedule


def main(population):
    #generate generations
    time_limit = now + PLANNING_TIME
    start_points = base_data['start']
    ELITISM_RATE = 0.1
    elite_count = int(ELITISM_RATE * POPULATION_SIZE)
    for generation in range(NUM_GENERATIONS):
        # Calculate fitness for each individual in the population
        fitnesses = [fitness(ind) for ind in population]
        
        # Track the best individual in the current population
        best_individual = max(population, key=lambda ind: fitness(ind))
        best_fitness = fitness(best_individual)
        print(f"Generation {generation}: Best Fitness = {best_fitness}, Best Individual = {best_individual}")
        
        population_fitness = list(zip(population, fitnesses))
        population_fitness.sort(key=lambda ind: ind[1], reverse=True)
        elite_individuals = [ind for ind, fit in population_fitness[:elite_count]]
        
        # print(population_fitness)
        if best_fitness == 0:
            MUTATION_RATE = 2
            new_population = []
        else:
            MUTATION_RATE = 1/POPULATION_SIZE
            new_population = elite_individuals

        while len(new_population) < POPULATION_SIZE:
            parent1 = select_parent(population)
            parent2 = select_parent(population)
            child1, child2 = crossover(parent1, parent2)
            child1, child2 = mutate(ships, child1, port_list, time_limit, start_points), mutate(ships, child2, port_list, time_limit, start_points)
            new_population.append(child1)
            new_population.append(child2)
        # # Update the population for the next generation
        # population = new_population[:POPULATION_SIZE]  # Ensure the population size remains constant

    return max(population, key=lambda ind: fitness(ind))


global all_data
all_data = dict()
base_data = base2
all_data['cargo_list'] = cargo_data
all_data['fixed_time'] = base_data['fixed_time']
all_data['port_list'] = base_data['port_list']
all_data['ship_capacity'] = base_data['ship_capacity']
all_data['ship_list'] = base_data['ship_list']

now = 10

POPULATION_SIZE = 1000
PLANNING_TIME = 8
MUTATION_RATE = 1/POPULATION_SIZE
NUM_GENERATIONS = 100

#initial population
population = []
start = base_data['start']
port_list = base_data['port_list']
time_btwn_ports = base_data['fixed_time']
ships = base_data['ship_list']
for i in range(POPULATION_SIZE):
    all_ship_schedule = dict()
    for ship in start:
        all_ship_schedule[ship] = create_schedule(start[ship], port_list, time_btwn_ports, PLANNING_TIME)
    population.append(all_ship_schedule)

print(main(population))



