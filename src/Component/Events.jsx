import React from "react";
import { useParams, Link } from "react-router-dom";
import { clubs } from "../data";

export const Events = () => {
  const { clubId } = useParams();
  const club = clubs.find((c) => c.id.toString() === clubId);

  if (!club) {
    return <h2 className="text-center text-xl mt-10">Club not found</h2>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
        {club.name} Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {club.events.map((event) => (
          <div
            key={event.id}
            className="bg-white border rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {event.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                📅 {event.date} &nbsp; | &nbsp; 📍 {event.location}
              </p>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
            </div>

            <Link
              to={`/card_details/${event.id}`}
              className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
