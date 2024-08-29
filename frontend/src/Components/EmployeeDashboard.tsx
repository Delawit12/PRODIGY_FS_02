import React from 'react';
import Sidebar from './Sidebar';


const EmployeeDashboard = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
                <p>Welcome to the employee dashboard. Here you can apply for leave and view your leave status.</p>
                {/* Add employee-specific content here */}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
