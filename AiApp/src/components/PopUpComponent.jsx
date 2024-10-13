// PopupComponent.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PopupComponent = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-10 rounded-lg shadow-lg relative h-[75vh]">
        <button onClick={onClose} className="absolute top-4 right-6 text-gray-600 hover:text-gray-800">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupComponent;
