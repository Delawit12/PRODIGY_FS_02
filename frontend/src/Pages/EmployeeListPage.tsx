import React, { useState, useEffect } from 'react';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch employees from JSON or API
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filter employees based on search criteria
    const filterEmployees = () => {
      let filtered = employees;
      
      // Search filtering
      if (search) {
        filtered = filtered.filter(employee =>
          employee.id.toString().toLowerCase().includes(search.toLowerCase()) ||
          employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
          employee.email.toLowerCase().includes(search.toLowerCase()) ||
          employee.phoneNumber.includes(search) ||
          employee.department.toLowerCase().includes(search.toLowerCase()) ||
          employee.role.toLowerCase().includes(search.toLowerCase())
        );
      }

      setFilteredEmployees(filtered);
    };

    filterEmployees();
  }, [search, employees]);

  return (
    <div className="container mx-auto my-8 ">
      <h1 className="text-3xl font-bold mb-4">Employee Management</h1>

      {/* Search Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="will-change-auto border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
      </div>

      {/* Employee Table */}
      <table className="w-fit border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.firstName} {employee.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeListPage;
