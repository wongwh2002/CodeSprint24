import React, { useEffect, useState } from 'react';
import data from '../pages/sample_data/data.json';  // Assuming the JSON file is local

const CargoGrid = () => {
  const [cargoData, setCargoData] = useState([]);

  useEffect(() => {
    // If data is local, it's already imported above. 
    // If fetching from an API, use fetch here instead.
    setCargoData(data);
  }, []);

  return (
    <div className="grid grid-cols-[300px_300px_300px] gap-2 text-xl">
      {cargoData.map((cargo, index) => (
        <React.Fragment key={index}>
          <div className='col-span-3 h-0.5 bg-[#dddddd] rounded'/>
          <div className={`overflow-y-auto overflow-x-hidden ${cargo.isDone ? 'text-gray-400' : 'text-black'}`}>
            {cargo.port}
          </div>
          <div className={`overflow-y-auto overflow-x-hidden ${cargo.isDone ? 'text-gray-400' : 'text-black'}`}>
            {cargo.cargo_to_pick_up}
          </div>
          <div className={`overflow-y-auto overflow-x-hidden ${cargo.isDone ? 'text-gray-400' : 'text-black'}`}>
            {cargo.cargo_to_drop_off}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CargoGrid;
