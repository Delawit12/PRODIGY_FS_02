import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeProfile = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employees/${employeeId}`);
        setEmployee(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching employee profile:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/employees/${employeeId}`, formData);
      alert('Profile updated successfully!');
      setEmployee(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="profile-container p-4">
      <div className="profile-picture mb-4">
        <img
          src={employee.profilePicture}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="rounded-full w-24 h-24 object-cover"
        />
      </div>
      <div className="profile-details">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form space-y-4">
            <label className="block">
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="block">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="block">
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="block">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded"
              />
            </label>
            {/* Add other fields similarly */}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>First Name: {employee.firstName}</p>
            <p>Last Name: {employee.lastName}</p>
            <p>Phone Number: {employee.phoneNumber}</p>
            <p>Email: {employee.email}</p>
            {/* Display other fields similarly */}
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
