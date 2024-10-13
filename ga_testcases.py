

base1 =  {"fixed_time": {("A","B") : 1, ("B","C") : 1, ("A","C") : 1,
                         ("B","A") : 1, ("C","B") : 1, ("C","A") : 1,
                         ("A","D") : 1, ("B","D") : 1, ("C","D") : 1,
                         ("D","A") : 1, ("D","B") : 1, ("D","C") : 1},
          "start": {1: ("A", 10), 2: ("D", 10)},
          "port_list": ["A", "B", "C", "D"],
          "ship_capacity": {1: 3, 2: 3},
          "ship_list": [1, 2],        
}

cargos = {"cargo_1": (1,"B", "A"), "cargo_2": (1,"C","A"), "cargo_3": (1, "B", "D"), "cargo_4": (1,"A","D"),
                         "cargo_5": (1, "C", "D"), "cargo_6": (1,"D", "A")}

def test():
    try:
        raise IndexError
        return 1
    except:
        return 0

print(test())