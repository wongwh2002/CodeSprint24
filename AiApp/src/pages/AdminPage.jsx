import React from "react";
import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import CsvComponent from "../components/CsvComponent";
import AdminMap from "../components/AdminMap";
import LocalHtmlEmbed from "../components/FixedAdminMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
    return (
        <div className="flex flex-col items-center bg-[#141A22] w-[100vw] h-[100vh] overflow-y-auto">
            <div className="flex flex-col lg:flex-row w-full justify-center">
                <NavLink to='/'>
                    <img src='../../psa_logo_white.png' className="lg:pl-32 h-36"/>
                </NavLink>
                <div className="text-white text-3xl lg:text-5xl mt-14 text-center lg:ml-auto lg:mr-[10vw] my-5"> Available Shipping Routes</div>
            </div>
            <div className="w-4/5 h-[200vh] bg-white rounded-lg flex flex-col">
                {/* <AdminMap /> */}
                <div className="w-full overflow-hidden rounded-lg">
                    <LocalHtmlEmbed />
                </div>
                <div className="m-5 space-y-5">
                    <CsvComponent prompt='Input your Ship Information'/>
                    <CsvComponent prompt='Input your Cargo Information'/>
                </div>
            </div>
            <NavLink to='/'>
                {/* <div className="z-10 bg-[#444444] w-24 text-center text-white rounded-sm p-2">
                    Logout
                </div> */}
                <div className="m-5 text-white group hover:text-[#cccccc] transition duration-200"> 
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-white group-hover:text-[#cccccc] transition duration-200" />
                    Logout 
                </div>
            </NavLink>
        </div>
    )
}

export default AdminPage;