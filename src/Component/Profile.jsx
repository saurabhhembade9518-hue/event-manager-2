import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john@example.com",
    joined: "Jan 1, 2024",
    avatar: "https://i.pravatar.cc/100?img=5",
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-400 animate-sky-glow flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 text-white animate-throw-up">
        <div className="flex flex-col items-center animate-fade-in-up">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-600 mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-400 text-sm mb-4">{user.email}</p>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 space-y-2 text-sm animate-fade-in-up">
          <p><span className="text-gray-400">Joined:</span> {user.joined}</p>
        </div>

        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
