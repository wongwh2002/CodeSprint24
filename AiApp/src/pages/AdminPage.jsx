import React from "react";
import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import AdminMap from "../components/AdminMap";

const AdminPage = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-[#141A22] w-[100vw] h-[100vh]">
            <div className="flex h-[75vh] rounded-lg overflow-hidden">
                <AdminMap />
            </div>
            <div className="h-3" />
            <NavLink to='/'>
                <div className="z-10 bg-[#444444] w-24 text-center text-white rounded-sm p-2">
                    Logout
                </div>
            </NavLink>
        </div>
    )
}

export default AdminPage;