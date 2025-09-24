import React from "react";
import { clubs } from "../data";
import { Link } from "react-router-dom";

// Helper function to get emoji based on club name
const getClubEmoji = (clubName) => {
  const lowerName = clubName.toLowerCase();
  if (lowerName.includes("tech") || lowerName.includes("coding")) return "💻";
  if (lowerName.includes("music")) return "🎵";
  if (lowerName.includes("dance")) return "💃";
  if (lowerName.includes("art")) return "🎨";
  if (lowerName.includes("sports")) return "🏅";
  if (lowerName.includes("drama") || lowerName.includes("theatre")) return "🎭";
  if (lowerName.includes("robotics")) return "🤖";
  if (lowerName.includes("photography")) return "📸";
  // Default icon
  return "🎯";
};

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20 relative overflow-hidden">
      {/* Smoothly animated sky-blue background */}
      <div
        className="absolute inset-0
          bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500
          bg-[length:200%_200%] bg-[position:0%_50%]
          animate-sky-glow opacity-20 blur-3xl pointer-events-none z-0"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-sky-400 animate-fade-in-down">
          Dr. DY Patil Institute of Technology - Clubs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {clubs.map((club, index) => {
            const animation =
              index % 3 === 0
                ? "animate-fade-in-left"
                : index % 3 === 1
                ? "animate-fade-in-right"
                : "animate-fade-in-up";

            const emoji = getClubEmoji(club.name);

            return (
              <Link
                key={club.id}
                to={`/events/${club.id}`}
                className={`bg-white/5 backdrop-blur-md
                            border border-sky-800 hover:border-sky-400
                            text-white rounded-2xl shadow-lg
                            hover:shadow-xl p-6 transition-transform duration-300 ease-in-out
                            transform hover:scale-105 flex flex-col justify-between
                            opacity-0 ${animation}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h2 className="text-2xl font-bold text-sky-300 mb-3 flex items-center gap-2">
                  <span role="img" aria-label="club icon" className="text-pink-400">
                    {emoji}
                  </span>
                  {club.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  {club.events.length} Event{club.events.length > 1 ? "s" : ""}
                </p>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {club.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
