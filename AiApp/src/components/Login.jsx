import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
    return (
        <div className="grid grid-flow-row gap-5 justify-items-end">
            <div className="outline outline-[#bbbbbb] text-[#555555] w-36 outline-2 rounded-sm p-2">
                ID
            </div>
            <div className="outline outline-[#bbbbbb] text-[#555555] w-36 outline-2 rounded-sm p-2">
                Password
            </div>
            <NavLink to='/admin'>
                <div className="bg-[#444444] w-24 text-center text-white rounded-sm p-2">
                    Login
                </div>
            </NavLink>
        </div>
    )
}

export default Login;