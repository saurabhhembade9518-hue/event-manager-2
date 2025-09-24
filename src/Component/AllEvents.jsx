import React from "react";
import { Link } from "react-router-dom";
import { clubs } from "../data";

export const AllEvents = () => {
  const allEvents = clubs.flatMap((club) =>
    club.events.map((event) => ({ ...event, clubName: club.name }))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20 relative overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0
          bg-gradient-to-r from-purple-600 via-teal-400 to-indigo-500
          bg-[length:200%_200%] bg-[position:0%_50%]
          animate-sky-glow opacity-20 blur-3xl pointer-events-none z-0"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-14 text-center text-teal-300 animate-fade-in-down">
          All Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allEvents.map((event, index) => (
            <div
              key={event.id}
              className={`bg-white/5 backdrop-blur-md 
                border border-purple-700 hover:border-teal-400 
                text-white rounded-2xl shadow-lg 
                hover:shadow-xl p-6 transition-all duration-300
                transform hover:scale-105 flex flex-col justify-between
                opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <h2 className="text-2xl font-bold text-teal-300 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-400 text-sm mb-2">
                  📅 {event.date} &nbsp; | &nbsp; 📍 {event.location}
                </p>
                <p className="text-gray-400 mb-4 text-sm italic">
                  Club: {event.clubName}
                </p>
                <p className="text-gray-300 mb-4 text-sm">{event.description}</p>
              </div>

              {/* Blue button in center */}
              <div className="mt-auto flex justify-center">
                <Link
                  to={`/card_details/${event.id}`}
                  className="bg-blue-600 hover:bg-blue-800
                    text-white px-6 py-2 rounded-lg text-sm font-semibold
                    text-center transition duration-300 w-full max-w-xs"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
