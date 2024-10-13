import pygad 
import random
import heapq
from D_Algo.d_algo import algo
NUM_SCHEDULES = 10
NUM_PLANS = 10
MUTATION_RATE = 1/NUM_SCHEDULES
NUM_GENERATIONS = 5
DAYS = 50
HOURS = 24
ship_ids = [1,2,3]
capacities = {1:10, 2:5, 3: 2}

# change this to dijstrka later
def fitness(solution):
    return random.uniform(0, 1) 

#assume the ships can js take up random schedules
def create_schedule(start, ports, time_btwn_ports, total_time): #create per ship
    elapsed_time = 0
    start_port = start[0]
    start_time = start[1]
    ship_schedule = []
    # "schedule": {"A": [("B", 10, 10, 1), ("C", 10, 12, 2)],
    while elapsed_time < total_time: #within the planning schedule
        available_ports = ports.deepcopy()
        available_ports.remove(start_port)
        next_node = random.choice(available_ports)
        ship_schedule.append((start, next_node, start_time + elapsed_time))
        elapsed_time += time_btwn_ports[(start, next_node)]
        start_port = next_node
    return ship_schedule


base =  {"fixed_time": {("A","B") : 1, ("B","C") : 1, ("A","C") : 1,
                         ("B","A") : 1, ("C","B") : 1, ("C","A") : 1,
                         ("A","D") : 1, ("B","D") : 1, ("C","D") : 1,
                         ("D","A") : 1, ("D","B") : 1, ("D","C") : 1},
          "start": {1: ("A", 10), 2: ("D", 10)},
          "port_list": ["A", "B", "C", "D"],
          "ship_capacity": {1: 3, 2: 3},
          "ship_list": [1, 2],        
}

start = base['start']
port_list = base['port_list']
time_btwn_ports = base['fixed_time']
PLANNING_TIME = 4

create_schedule(start, ports, time_btwn_ports)

    # day = random.randint(0, DAYS - 1)
    # hour = random.randint(0,HOURS - 1)
    # capacity = capacities[random.choice(ship_ids)]
    # return [nodes,day,hour, capacity]
#node, day, hour

def select_parent(population):
    # Tournament selection
    tournament = random.sample(population, k=5)
    tournament.sort(key=fitness, reverse=True)
    return tournament[0]

def crossover(parent1, parent2):
    # Single-point crossover
    crossover_point = random.randint(1, 3)  # Choose a point between the four components
    child = parent1[:crossover_point] + parent2[crossover_point:]
    return child

def mutate(plan): #dont mutate the ships cos assume the ship capacities and number of ships are fixed 
    for schedule in plan:   
        if random.random() < MUTATION_RATE:
            schedule[0] = ''.join(random.sample(ports, 2))     
        if random.random() < MUTATION_RATE:
            # Mutate day
            schedule[1] = random.randint(0, DAYS - 1)
        if random.random() < MUTATION_RATE:
            # Mutate time
            schedule[2] = random.randint(0, HOURS - 1)
        return plan

#simulating data
ports = ['0','1','2','3','4','5']

duration = {}
for i in ports:
    for j in ports:
        if i != j:
            duration[i+j] = random.randint(0,10)
            duration[j+i] = random.randint(0,10)

print("Simulated Durations:", duration)

plans = []
for i in range(NUM_PLANS):
    ship_schedule = []
    for i in range(NUM_SCHEDULES):
        ship_schedule.append(create_schedule())
        # print(ship_schedule)
    plans.append(ship_schedule)

for generation in range(NUM_PLANS):
    new_population = []
    for _ in range(NUM_PLANS):
        parent1 = select_parent(plans)
        parent2 = select_parent(plans)
        child = crossover(parent1, parent2)
        child = mutate(child)
        new_population.append(child)
    plans = new_population

print("CONSIDERED PLANS")
for i in plans:
    print(i)
# Evaluate the best solution
best_schedule = max(plans, key=fitness)
print("Best Schedule:", best_schedule)
print("Best Fitness:", fitness(best_schedule))






    
    
    