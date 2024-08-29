import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});

  useEffect(() => {
    // Fetch employees data
    const fetchEmployees = async () => {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      setEmployees(data);

      // Calculate active employees
      const active = data.filter(emp => emp.status === "active").length;
      setActiveEmployees(active);

      // Calculate employees by department
      const deptCount = data.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      }, {});
      setEmployeesByDepartment(deptCount);
    };

    // // Fetch departments data
    // const fetchDepartments = async () => {
    //   const response = await fetch("http://localhost:3000/departments");
    //   const data = await response.json();
    //   setDepartments(data);
    // };

    fetchEmployees();
    // fetchDepartments();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>
          Welcome to the admin dashboard. Here you can manage employees and leave applications.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Total Employees</h2>
            <p className="text-2xl">{employees.length}</p>
            
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Active Employees</h2>
            <p className="text-2xl">{activeEmployees}</p>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Departments</h2>
            <p className="text-2xl">{departments.length}</p>
          </div> */}
        </div>

        {/* Employees by Department Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Employees by Department</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={Object.entries(employeesByDepartment).map(([name, value]) => ({ name, value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
            >
              {Object.keys(employeesByDepartment).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <Link to="/addEmployee" className="block px-4 py-2 bg-blue-500 text-white rounded-md mb-4">Add Employee</Link>
        <br />
        <Link to="/read" className="block px-4 py-2 bg-blue-500 text-white rounded-md">Employees List</Link>
        <br />
        <Link to="/employee-profile" className="block px-4 py-2 bg-blue-500 text-white rounded-md">
          Manage Profile
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
