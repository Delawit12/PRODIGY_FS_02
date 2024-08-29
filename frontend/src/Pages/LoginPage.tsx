// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.get("http://localhost:3000/employees");

//       const user = response.data.find(
//         (employee) => employee.email === email && employee.password === password
//       );

//       if (user) {
//         localStorage.setItem("authToken", "mock-token"); // Ideally, this should be a real token from your backend
//         localStorage.setItem("role", user.role);

//         if (user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else if (user.role === "employee") {
//           navigate("/employee-dashboard");
//         }
//       } else {
//         setError("Invalid login credentials");
//       }
//     } catch (err) {
//       setError("Error logging in. Please try again.");
//     }
//   };

  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-teal-500 text-3xl font-semibold mb-6 text-center">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
