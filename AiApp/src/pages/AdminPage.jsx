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
            <div className="w-full">
                <img src='../../psa_logo_white.png' className="pl-32 h-36"/>
            </div>
            <div className="flex flex-col rounded-lg overflow-hidden overflow-y-auto">
                {/* <AdminMap /> */}
                <LocalHtmlEmbed />
                <div className="bg-white ">
                    <div className="m-5 space-y-5">
                        <CsvComponent prompt='Input your Ship Information'/>
                        <CsvComponent prompt='Input your Cargo Information'/>
                    </div>
                </div>
            </div>
            <NavLink to='/'>
                {/* <div className="z-10 bg-[#444444] w-24 text-center text-white rounded-sm p-2">
                    Logout
                </div> */}
                <div className="m-5 text-white"> 
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-white" />
                    Logout 
                </div>
            </NavLink>
        </div>
    )
}

export default AdminPage;