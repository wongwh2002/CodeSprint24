import React from 'react';

const LocalHtmlEmbed = () => {
  return (
    <div>
      <iframe 
        // src={`http://localhost:5173/map.html`} // Point to the local HTML file
        src={`https://codesprint-psa.firebaseapp.com/map.html`} // Point to the local HTML file
        width="1200" 
        height="500" 
        title="Embedded Local HTML"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default LocalHtmlEmbed;
