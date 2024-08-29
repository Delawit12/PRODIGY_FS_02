import React from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4 text-center text-2xl font-bold">
                
                <div>Company Name</div>
            </div>
            <nav className="mt-10">
                <ul>
                    <li className="mb-2">
                        <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
                    </li>
                    <li className="mb-2">
                        {/* <Link to="/read" className="block px-4 py-2 hover:bg-gray-700">Employees</Link> */}
                    </li>
                    <li className="mb-2">
                        <Link to="/leaves" className="block px-4 py-2 hover:bg-gray-700">Leave Applications</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
