import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvComponent = ({ prompt }) => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      Papa.parse(file, {
        header: true, // This treats the first row as the header row.
        complete: (results) => {
          setCsvData(results.data); // Set the parsed data to state
        },
        skipEmptyLines: true, // Skip empty lines in the CSV
      });
    }
  };

  return (
    <div className=''>
        <div className='flex flex-row space-x-5'>
            <div className="text-xl font-semibold"> {prompt} </div>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <div>
            {csvData.map((row, index) => (
            <MyComponent key={index} data={row} />
            ))}
        </div>
    </div>
  );
};

const MyComponent = ({ data }) => {
  return (
    <div className="p-4 m-2 border">
      {Object.keys(data).map((key, index) => (
        <p key={index}>
          <strong>{key}:</strong> {data[key]}
        </p>
      ))}
    </div>
  );
};

export default CsvComponent;
