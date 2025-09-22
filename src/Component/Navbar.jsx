import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">Eventopia ⚽️🏃‍♂️</h1>
        <div className="space-x-6 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 decoration-2 font-semibold"
                : "hover:underline underline-offset-4"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 decoration-2 font-semibold"
                : "hover:underline underline-offset-4"
            }
          >
            All Events
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
