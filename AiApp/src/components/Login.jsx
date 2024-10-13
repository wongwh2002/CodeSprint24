import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'

const Login = () => {
    
    const [formData, setFormData] = useState({
        id: '',
        password: '',
      })

      const { id, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }  
    
    return (
        <div className="grid grid-flow-row justify-items-end">
            <form className="space-y-3 grid justify-items-end">
                <input
                    type="text"
                    name="id"
                    id="id"
                    autoComplete="id"
                    placeholder='ID'
                    value={id}
                    onChange={onChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    placeholder='Password'
                    value={password}
                    onChange={onChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <button
                    type="submit"
                    className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#444444] hover:bg-[#222222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <NavLink to='/admin' className='w-full justify-content grid'>
                            Login
                    </NavLink>
                </button>
            </form>
        </div>
    )
}

export default Login;