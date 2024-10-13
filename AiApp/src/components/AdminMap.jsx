import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const AdminMap = ( {ctr_lat, ctr_lng }) => {
  const [csvData, setCsvData] = useState([]);
  const [clickedLineIndex, setClickedLineIndex] = useState(null); // Track which line is clicked


  // Simulate the CSV data as a string
  const csvString = `latitude,longitude,description
  1.30483483525,103.72499862742852,port a
  1.265019411760954,103.84722152058744,port b
  1.237560141861423,103.61582199814613,port c
  1.2725706603045575, 103.80190291975323,port d
  2.522866849325671, 101.79779816207036,port e`
  ;

  // Parse the CSV string when the component mounts
  useEffect(() => {
    Papa.parse(csvString, {
      header: true, // Use the first row as headers
      complete: (results) => {
        setCsvData(results.data); // Set the parsed data to state
      },
      skipEmptyLines: true, // Skip empty lines
    });
  }, []);

  const calculateBezierCurve = (start, control, end, numPoints = 50) => {
    const points = [];
    for (let t = 0; t <= 1; t += 1 / numPoints) {
      const x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * control[0] + t * t * end[0];
      const y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * control[1] + t * t * end[1];
      points.push([x, y]);
    }
    return points;
  };

  const multiPolyline = csvData.reduce((lines, curr, index, array) => {
    if (index < array.length - 1) {
        for (let i = index; i < array.length - 1; i++) {
            const next = array[i + 1];
            const currentCoords = [parseFloat(curr.latitude.trim()), parseFloat(curr.longitude.trim())];
            const nextCoords = [parseFloat(next.latitude.trim()), parseFloat(next.longitude.trim())];
      
            // Control point is halfway between the two points but offset for the curve
            const controlCoords = [
              (currentCoords[0] + nextCoords[0]) / 2 - 0.1, // You can adjust the offset for the curve effect
              (currentCoords[1] + nextCoords[1]) / 2 - 0.1
            ];
      
            if (!isNaN(currentCoords[0]) && !isNaN(currentCoords[1]) &&
                !isNaN(nextCoords[0]) && !isNaN(nextCoords[1])) {
              const curvePoints = calculateBezierCurve(currentCoords, controlCoords, nextCoords);
              lines.push(curvePoints); // Add the calculated Bezier curve points
            }
          }
          return lines;
    }
    return lines;
  }, []);

  return (
    <div id="map" className="flex">
      <MapContainer
        center={[ctr_lat || 1.363128028154264, ctr_lng || 103.80666161466776]}
        zoom={10}
        scrollWheelZoom={false}
        className="w-[80vw] h-[75vh]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {csvData.map((row, index) => (
            <MyComponent key={index} data={row} />
        ))}
        {multiPolyline.map((line, index) => (
          <Polyline
            key={index}
            positions={line}
            color={clickedLineIndex === index ? "red" : "blue"} // Change color based on clicked state
            eventHandlers={{
              click: () => {
                setClickedLineIndex(index); // Set clicked line index on click
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

const MyComponent = ({ data }) => {
  // Parse latitude and longitude and check if they are valid numbers
  const lat = parseFloat(data.latitude);
  const lng = parseFloat(data.longitude);

  // Only render the marker if both lat and lng are valid numbers
  if (!isNaN(lat) && !isNaN(lng)) {
    return (
      <Marker position={[lat, lng]}>
        <Popup>{data.description}</Popup>
      </Marker>
    );
  } else {
    console.error('Invalid coordinates:', lat, lng);
    return null; // Skip rendering the marker for invalid coordinates
  }
};

export default AdminMap;
