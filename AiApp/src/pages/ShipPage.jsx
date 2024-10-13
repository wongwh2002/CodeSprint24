import React, { useState } from "react";
import PopupComponent from "../components/PopUpComponent";
import ShipMap from "../components/ShipMap";
import CargoGrid from "../components/CargoGrid";

const ShipPage = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#141A22] w-[100vw] h-[100vh]">
            <div className="w-full">
                <img src='../../psa_logo_white.png' className="pl-32 h-36"/>
            </div>
            <div className="w-4/5 h-3/5 bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-bold text-5xl w-full text-center">Ship Name</div>
                <div className="w-3/4 p-20 text-3xl space-y-5">
                    <div>
                        Current Port:
                    </div>
                    <div>
                        Next Port:
                    </div>
                    <button onClick={handleButtonClick} className="transition duration-200 text-lg mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 hover:outline-none hover:ring-gray-500 hover:border-gray-500">
                        View Container Status
                    </button>
                    {isPopupVisible && (
                        <PopupComponent onClose={handleClosePopup}>
                            <h2 className="mb-5">Container Status</h2>
                            <div className="overflow-y-auto h-[60vh]">
                                <div className="overflow-hidden h-[60vh] flex rounded-lg">
                                    <ShipMap ctr_lat={1.353823011276384} ctr_lng={103.75930434583789}/>
                                </div>
                                <div className="my-5 grid grid-cols-3">
                                    <div className="col-span-1 text-2xl font-bold">Port Name</div>
                                    <div className="col-span-1 text-2xl font-bold"> Cargo (pick up)</div>
                                    <div className="col-span-1 text-2xl font-bold"> Cargo (drop off)</div>
                                </div>
                                <CargoGrid />
                            </div>
                        </PopupComponent>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShipPage