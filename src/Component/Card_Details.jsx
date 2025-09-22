import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { clubs } from "../data";
import { ParticipationForm } from "./ParticipationForm";

export const Card_Details = () => {
  const { eventId } = useParams();
  const event = clubs
    .flatMap((club) => club.events)
    .find((e) => e.id.toString() === eventId);

  const [showForm, setShowForm] = useState(false);
  const [participated, setParticipated] = useState(false);

  if (!event) {
    return <h2 className="text-center text-xl mt-10">Event not found</h2>;
  }

  const handleParticipateClick = () => {
    setShowForm(true);
  };

  const handleParticipationComplete = () => {
    setParticipated(true);
    setShowForm(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-gray-700 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
            📅 {event.date}
          </span>
          <span className="text-gray-700 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
            📍 {event.location}
          </span>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          {event.description}
        </p>

        {!showForm ? (
          <button
            onClick={handleParticipateClick}
            disabled={participated}
            className={`px-5 py-3 mt-6 rounded-lg text-white font-medium transition ${
              participated
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {participated ? "Participated ✅" : "Participate"}
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
