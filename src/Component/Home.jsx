import React from "react";
import { clubs } from "../data";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-4xl font-extrabold mb-10 text-center text-gray-900">
      Dr. DY Patil Institute of Technology , Clubs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club) => (
          <Link
            key={club.id}
            to={`/events/${club.id}`}
            className="group block bg-white border rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
              {club.name}
            </h2>
            <p className="text-gray-600 text-lg">
              {club.events.length} Event{club.events.length > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
