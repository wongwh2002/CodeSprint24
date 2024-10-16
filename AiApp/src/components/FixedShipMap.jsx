import React from 'react';

const FixedShipMap = () => {
  return (
    <div>
      <iframe 
        // src={`http://localhost:5173/longest_path_map.html`} // Point to the local HTML file
        src={`https://codesprint-psa.firebaseapp.com/map.html`} // Point to the local HTML file
        width="1177" 
        height="500" 
        title="Embedded Local HTML"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default FixedShipMap;
