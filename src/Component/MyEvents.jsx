import React from "react";

const MyEvents = () => {
  // Simulated list of events
  const participatedEvents = [
    { id: 1, title: "Football Tournament", date: "2024-08-10" },
    { id: 2, title: "Marathon Run", date: "2024-09-20" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-400 animate-sky-glow text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">My Participated Events 🗓️</h2>

        {participatedEvents.length > 0 ? (
          <ul className="space-y-4 animate-fade-in-up">
            {participatedEvents.map((event) => (
              <li
                key={event.id}
                className="bg-gray-800 border border-gray-700 rounded-md p-4 shadow-md"
              >
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-400 text-sm">Date: {event.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">You haven’t participated in any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
