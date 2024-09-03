import React, { useState } from "react";
import axios from "../Utils/axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the API call

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // Handle the successful login response
      console.log("Login successful:", response.data);
      setLoading(false);
      if (response.data.status === "success") {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard";
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      // Handle errors
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <div className="relative bg-black text-white h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-700 to-teal-500 opacity-30 animate-gradient-x"></div>

      <div className="relative w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-teal-500 text-3xl font-semibold mb-6 text-center">
          Login
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Welcome back! Please login to your account.
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-gray-400 text-center">Loading...</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg">
              <span className="px-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-r-lg focus:outline-none focus:border-teal-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg">
              <span className="px-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-r-lg focus:outline-none focus:border-teal-500"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="form-checkbox text-teal-500 mr-2"
              />
              Remember Me
            </label>
            <a href="#" className="text-teal-500 hover:text-teal-400 text-sm">
              Forgot Password?
            </a>
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

export default LoginPage;
