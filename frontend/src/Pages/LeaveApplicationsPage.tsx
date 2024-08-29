import React, { useState, useEffect } from 'react';

const LeaveApplicationPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch leaves from the JSON database
    const fetchLeaves = async () => {
      try {
        const response = await fetch('http://localhost:3000/leaves');
        const data = await response.json();
        setLeaves(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching leaves:', error);
        setIsLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div className='bg-red-500'>
      <h1>Leave Application Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className=''>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="6">No leaves found.</td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>
                  <td>{leave.employeeId}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveApplicationPage;