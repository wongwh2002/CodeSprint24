import React from 'react';

const LocalHtmlEmbed = () => {
  return (
    <div>
      <iframe 
        src={`http://localhost:5173/map.html`} // Point to the local HTML file
        // src={`${process.env.VITE_REACT_APP_firebase_authDomain}/map.html`} // Point to the local HTML file
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
