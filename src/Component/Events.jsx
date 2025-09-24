import React from "react";
import { useParams, Link } from "react-router-dom";
import { clubs } from "../data";

export const Events = () => {
  const { clubId } = useParams();
  const club = clubs.find((c) => c.id.toString() === clubId);

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-xl text-center">❌ Club not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20 relative overflow-hidden">
      {/* Sky-blue animated glow */}
      <div
        className="absolute inset-0 
          bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 
          bg-[length:200%_200%] bg-[position:0%_50%] 
          animate-sky-glow opacity-25 blur-3xl pointer-events-none z-0"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-sky-400">
          {club.name} Events
        </h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {club.events.map((event, index) => (
            <div
              key={event.id}
              className={`bg-white/5 backdrop-blur-md 
                          border border-sky-800 hover:border-sky-400 
                          text-white rounded-2xl shadow-lg 
                          hover:shadow-xl p-6 transition-all duration-300 
                          transform hover:scale-105 flex flex-col justify-between
                          opacity-0 animate-throw-up`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
            >
              {/* Title */}
              <h2 className="text-2xl font-bold text-sky-300 mb-2">
                {event.title}
              </h2>

              {/* Date & Location */}
              <p className="text-gray-400 text-sm mb-1">📅 {event.date}</p>
              <p className="text-gray-400 text-sm mb-4">📍 {event.location}</p>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                {event.description}
              </p>

              {/* CTA */}
              <Link
                to={`/card_details/${event.id}`}
                className="mt-auto inline-block bg-sky-600 hover:bg-sky-500 
                           text-white px-4 py-2 rounded-lg text-sm font-semibold 
                           transition duration-300 text-center"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
