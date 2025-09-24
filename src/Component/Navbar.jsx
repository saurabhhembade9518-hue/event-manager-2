import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg"; 

export const Navbar = () => {
  const [user, setUser] = useState(window.user || null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        window.user = parsedUser;
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid JSON in localStorage for 'user':", storedUser);
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener("userUpdated", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("userUpdated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.user = null;
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Eventopia ⚽️🏃‍♂️
        </h1>
        <div className="space-x-6 text-lg font-medium flex items-center relative">
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

          {user ? (
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 transition duration-200"
              >
                <CgProfile className="w-6 h-6 text-white" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white rounded-md shadow-lg z-50 overflow-hidden animate-fade-in-up">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-800 hover:text-white text-sm"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-blue-800 hover:text-white text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 decoration-2 font-semibold"
                  : "hover:underline underline-offset-4"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
