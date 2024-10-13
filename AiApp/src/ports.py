import searoute as sr
import folium

portData = [
    {
        "PortName": "Tuas",
        "PortActualName": "PSA Tuas Port",
        "Location": {"lat": 1.2395633230556833, "lng": 103.61659118396314},
    },
    {
        "PortName": "Jurong",
        "PortActualName": "PSA Jurong Island Terminal (JIT)",
        "Location": {"lat": 1.2886391308540717, "lng": 103.666303667014},
    },
    {
        "PortName": "Pasir Panjang",
        "PortActualName": "PSA Singapore - Multipurpose Terminal",
        "Location": {"lat": 1.293157652875155, "lng": 103.77256072531563},
    },
    {
        "PortName": "Brani",
        "PortActualName": "PSA Brani Terminal",
        "Location": {"lat": 1.2642907896740723, "lng": 103.83410701602287},
    },
    {
        "PortName": "Jakarta",
        "PortActualName": "New Priok Container Terminal One (NPCT1)",
        "Location": {"lat": -5.503645007056072, "lng": 107.0328982212003},
    },
    {
        "PortName": "Ameya",
        "PortActualName": "Ameya Logistics",
        "Location": {"lat": 18.80506733391735, "lng": 73.07964791060009},
    },
    {
        "PortName": "Sical",
        "PortActualName": "PSA SICAL Terminals Limited",
        "Location": {"lat": 8.553861979319608, "lng": 78.37834754736443},
    },
    {
        "PortName": "Baranagar",
        "PortActualName": "Container Terminal N.S.D Gate 7",
        "Location": {"lat": 12.785017886008374, "lng": 80.22405056171904},
    },
    {
        "PortName": "Laem Chabang",
        "PortActualName": "Laem Chabang International Terminal Co., Ltd (B-5 Terminal)",
        "Location": {"lat": 13.30240288070266, "lng": 100.89679655084919},
    },
    {
        "PortName": "Thai Connectivity",
        "PortActualName": "Thai Connectivity Terminal (TCT Map Ta Phut Industrial Port",
        "Location": {"lat": 12.655760354441844, "lng": 101.12242050350875},
    },
    {
        "PortName": "Cang Container Quoc Te",
        "PortActualName": "SP - PSA International Port",
        "Location": {"lat": 10.588901005461771, "lng": 107.01518758772386},
    },
    {
        "PortName": "Tan Cang Que Vo",
        "PortActualName": "ICD Tân Cảng Quế Võ",
        "Location": {"lat": 21.55288031841085, "lng": 106.15009727313961},
    },
    {
        "PortName": "Qinzhou",
        "PortActualName": "Qinzhou Port",
        "Location": {"lat": 22.22569762870952, "lng": 108.786816095586},
    },
    {
        "PortName": "Guang Zhou",
        "PortActualName": "Guangzhou South China Oceangate Container Terminal",
        "Location": {"lat": 22.956013190388607, "lng": 113.73066362406695},
    },
    {
        "PortName": "Fuzhou",
        "PortActualName": "Fuzhou International Container Terminal",
        "Location": {"lat": 26.110387475192258, "lng": 119.41241380126344},
    },
    {
        "PortName": "DingShuZhen",
        "PortActualName": "Container Terminals",
        "Location": {"lat": 31.277610227918167, "lng": 119.83420787374205},
    },
    {
        "PortName": "TianJin",
        "PortActualName": "Tianjin Port Container Terminal Co., Ltd.",
        "Location": {"lat": 38.78172961946943, "lng": 117.4709900687863},
    },
    {
        "PortName": "Dalian",
        "PortActualName": "Dalian Container Terminal Co.,Ltd.",
        "Location": {"lat": 38.521531342662804, "lng": 121.52466762991293},
    },
    {
        "PortName": "Hanjin Incheon",
        "PortActualName": "Hanjin Incheon Container Terminal",
        "Location": {"lat": 36.94059016874591, "lng": 126.52235229431564},
    },
    {
        "PortName": "Busan",
        "PortActualName": "Busan Port Terminal",
        "Location": {"lat": 36.27194770083046, "lng": 128.68801564889012},
    },
    {
        "PortName": "Hibikimachi",
        "PortActualName": "Hibikimachi",
        "Location": {"lat": 35.05386685062469, "lng": 130.63155968504674},
    },
]

# Create a new variable to store the nodes
my_nodes = {
    (port["PortName"]): {
        'x': port["Location"]["lng"],
        'y': port["Location"]["lat"]
    }
    for port in portData
}



adjacency_matrix = {}
# Calculate the time between each pair of nodes
for port1 in portData:
    adjacency_matrix[port1["PortName"]] = {}
    for port2 in portData:
        if port1["PortName"] != port2["PortName"]:
            origin = [port1["Location"]["lng"], port1["Location"]["lat"]]
            destination = [port2["Location"]["lng"], port2["Location"]["lat"]]
            route = sr.searoute(origin, destination, speed_knot=12.5, units="naut")
            duration = round(route["properties"]["duration_hours"],2)
            adjacency_matrix[port1["PortName"]][port2["PortName"]] = duration
        else:
            adjacency_matrix[port1["PortName"]][port2["PortName"]] = 0



# print(my_nodes)
fixed_time = {
    (port1, port2): adjacency_matrix[port1][port2]
    for port1 in adjacency_matrix
    for port2 in adjacency_matrix[port1]
}

# print(fixed_time)pi


# print([portData[0]["Location"]["lng"],portData[0]["Location"]["lat"]],
#                      [portData[1]["Location"]["lng"],portData[1]["Location"]["lat"]])

# Define origin and destination points
# Define a list of colors for different ports
colors = ['blue', 'red', 'green', 'purple', 'orange', 'brown', 'pink', 'gray', 'cyan']

# Create a map object centered at the first port
m = folium.Map(location=[portData[0]["Location"]["lat"], portData[0]["Location"]["lng"]], zoom_start=3)

# Draw lines for each port's outgoing edges
for i, port1 in enumerate(portData):
    color = colors[i % len(colors)]
    for port2 in portData:
        if port1["PortName"] != port2["PortName"]:
            origin = [port1["Location"]["lng"], port1["Location"]["lat"]]
            destination = [port2["Location"]["lng"], port2["Location"]["lat"]]
            route = sr.searoute(origin, destination, speed_knot=12.5, units="naut")
            coordinates = route['geometry']['coordinates']
            coordinates = [[coord[1], coord[0]] for coord in coordinates]
            folium.PolyLine(locations=coordinates, color=color, weight=1).add_to(m)

# Save the map object as an HTML file
m.save('map.html')

# Find the longest path in the adjacency matrix
longest_path = max(fixed_time, key=fixed_time.get)
longest_duration = fixed_time[longest_path]

# Extract the origin and destination ports
origin_port, destination_port = longest_path

# Get the coordinates for the origin and destination ports
origin_coords = [my_nodes[origin_port]['y'], my_nodes[origin_port]['x']]
destination_coords = [my_nodes[destination_port]['y'], my_nodes[destination_port]['x']]

# Create a new map object centered at the origin port
longest_path_map = folium.Map(location=origin_coords, zoom_start=3)

# Get the route for the longest path
route = sr.searoute([my_nodes[origin_port]['x'], my_nodes[origin_port]['y']],
                    [my_nodes[destination_port]['x'], my_nodes[destination_port]['y']],
                    speed_knot=12.5, units="naut")
coordinates = route['geometry']['coordinates']
coordinates = [[coord[1], coord[0]] for coord in coordinates]

# Draw the longest path on the map
folium.PolyLine(locations=coordinates, color='red', weight=2.5).add_to(longest_path_map)

# Save the longest path map as an HTML file
longest_path_map.save('longest_path_map.html')