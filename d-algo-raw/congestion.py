import dalgonew
import testcase
from src.dalgonew import get_final_nodes, final_nodes, get_confirmed_cargo

data = testcase.case_2

def avg_from_deadline(test_data):
    dalgonew.run(test_data)
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
    print(time_taken / len(final_nodes))

def ship_data(test_data):
    dalgonew.run(test_data)
    confirmed_cargo = get_confirmed_cargo()
    for ship in confirmed_cargo:
        confirmed_cargo[ship] = sorted(confirmed_cargo[ship], key=lambda x : (x[2] * 24 + x[1]))
        print(confirmed_cargo[ship])

ship_data(data)
#avg_from_deadline(data)
