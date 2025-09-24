import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { clubs } from "../data";
import { ParticipationForm } from "./ParticipationForm";

export const CardDetails = () => {
  const { eventId } = useParams();
  const event = clubs
    .flatMap((club) => club.events)
    .find((e) => e.id.toString() === eventId);

  const [showForm, setShowForm] = useState(false);
  const [participated, setParticipated] = useState(false);

  if (!event) {
    return (
      <h2 className="text-center text-2xl mt-16 font-semibold text-red-600">
        ⚠️ Event not found
      </h2>
    );
  }

  const handleParticipateClick = () => {
    setShowForm(true);
  };

  const handleParticipationComplete = () => {
    setParticipated(true);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 relative overflow-hidden">
      {/* Slightly blueish animated glow background */}
      <div
        className="absolute inset-0
          bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900
          bg-[length:200%_200%] bg-[position:0%_50%]
          animate-sky-glow opacity-20 blur-3xl pointer-events-none z-0"
      />

      <div
        className="max-w-3xl mx-auto relative z-10 bg-[#111827] rounded-3xl border border-blue-900 p-10
          transition duration-300 ease-in-out outline-none
          hover:ring-2 hover:ring-pink-500 hover:ring-opacity-40
          opacity-0 animate-fade-in-up text-blue-300"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-blue-400">
          {event.title}
        </h1>

        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="inline-flex items-center gap-2 text-blue-300 bg-blue-900/20 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            📅 {event.date}
          </span>
          <span className="inline-flex items-center gap-2 text-blue-300 bg-blue-900/20 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            📍 {event.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-6">{event.description}</p>

        {/* Entry Fee */}
        <p className="text-lg font-semibold mb-4">
          Entry Fee: <span className="text-blue-400">{event.entryFee}</span>
        </p>

        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">Benefits</h2>
          <p className="text-blue-300">{event.benefits}</p>
        </div>

        {/* Cash Prizes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Cash Prizes</h2>
          <ul className="list-disc list-inside space-y-1 text-blue-300">
            {event.prizes.map((prize, idx) => (
              <li key={idx}>
                <span className="font-semibold">{prize.position}:</span> {prize.amount}
              </li>
            ))}
          </ul>
        </div>

        {/* Button / Form */}
        {!showForm ? (
          <button
            onClick={handleParticipateClick}
            disabled={participated}
            className={`px-6 py-3 mt-4 rounded-xl text-white font-semibold text-lg shadow-md transition-transform transform hover:scale-105 ${
              participated
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-700"
            }`}
          >
            {participated ? "✅ Participated" : "🚀 Participate Now"}
          </button>
        ) : (
          <ParticipationForm
            event={event}
            onParticipated={handleParticipationComplete}
          />
        )}
      </div>
    </div>
  );
};
