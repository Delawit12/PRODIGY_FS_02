import React from "react";
import company from "../assets/Company-amico.svg";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="relative bg-black text-white h-screen flex flex-col items-center overflow-hidden">
      <main className="relative flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="w-full max-w-xs">
          <img
            src={company}
            alt="Introductory Image"
            className="w-72 h-72 rounded-full object-cover"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-teal-500 text-4xl mb-4">WELCOME BACK !!!</h1>
          <p className="text-lg mb-8">
            Manage and streamline your employee records with ease.
          </p>
          <Link
            to="/login"
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-transform transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
