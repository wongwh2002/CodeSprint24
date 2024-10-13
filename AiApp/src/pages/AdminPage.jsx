import React from "react";
import { NavLink } from "react-router-dom";

const AdminPage = () => {
  return (
    <NavLink to="/">
      <div className="bg-[#444444] w-24 text-center text-white rounded-sm p-2">
        Back
      </div>
    </NavLink>
  );
};

export default AdminPage;
