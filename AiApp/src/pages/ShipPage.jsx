import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PopupComponent from "../components/PopUpComponent";
import ShipMap from "../components/ShipMap";
import CargoGrid from "../components/CargoGrid";
import FixedShipMap from "../components/FixedShipMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ShipPage = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="flex flex-col items-center bg-[#141A22] w-[100vw] h-[100vh] overflow-y-auto">
            <div className="flex flex-col lg:flex-row w-full">
                <NavLink to='/'>
                    <img src='../../psa_logo_white.png' className="pl-32 h-36 w-auto"/>
                </NavLink>
                <div className="text-white text-3xl lg:text-5xl mt-14 text-center lg:ml-auto lg:mr-[10vw] my-5"> Your Current Route </div>
            </div>
            <div className="w-4/5 h-[200vh] bg-white rounded-lg flex flex-col items-center">
                <div className="w-full overflow-hidden rounded-lg">
                    <FixedShipMap />
                </div>
                <div className="flex flex-col justify-center w-4/5 p-10 text-3xl space-y-5">
                    <div className="font-semibold text-5xl w-full text-center">Star Quest</div>
                    <div className="flex flex-rows">
                        <div className="w-1/2 text-[#999999]"> Current Port: </div>
                        <div className="w-1/2 text-right"> Tuas </div>
                    </div>
                    <div className="flex flex-rows">
                        <div className="w-1/2 text-[#999999]"> Next Port: </div>
                        <div className="w-1/2 text-right"> Cang Container Quoc Te </div>
                    </div>
                    <button onClick={handleButtonClick} className="transition duration-200 text-lg mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 hover:outline-none hover:ring-gray-500 hover:border-gray-500">
                        View Container Status
                    </button>
                    {isPopupVisible && (
                        <PopupComponent onClose={handleClosePopup}>
                            <h2 className="mb-5">Container Status</h2>
                            <div className="overflow-y-auto h-[60vh]">
                                <div className="my-5 grid grid-cols-[300px_300px_300px]">
                                    <div className="col-span-1 text-2xl font-bold">Port Name</div>
                                    <div className="col-span-1 text-2xl font-bold"> Cargo <br/> (pick up)</div>
                                    <div className="col-span-1 text-2xl font-bold"> Cargo <br/> (drop off)</div>
                                </div>
                                <CargoGrid />
                            </div>
                        </PopupComponent>
                    )}
                </div>
            </div>
            <NavLink to='/'>
                <div className="m-5 text-white group hover:text-[#cccccc] transition duration-200"> 
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-white group-hover:text-[#cccccc] transition duration-200" />
                    Logout 
                </div>
            </NavLink>
        </div>
    )
}

export default ShipPage