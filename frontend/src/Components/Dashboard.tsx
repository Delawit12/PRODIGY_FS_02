import React from "react";
import Sidebar from "./Sidebar";
const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Employee Management System
        </h1>
        <p className="text-lg mb-4">
          This system helps you manage employees, leave applications, and more.
          Use the navigation bar to explore the features.
        </p>
        {/* Add more content or sections here as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
