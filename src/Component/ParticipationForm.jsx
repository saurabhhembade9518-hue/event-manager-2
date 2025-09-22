import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ParticipationForm = ({ event, onParticipated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    payment: "UPI",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayClick = () => {
    // Redirect to payment page and send data
    navigate("/payment", { state: { event, formData } });
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="px-4 py-2 border rounded-lg"
        required
      />
     

      <button
        type="button"
        onClick={handlePayClick}
        className="px-5 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-medium transition"
      >
        Pay
      </button>
    </div>
  );
};
