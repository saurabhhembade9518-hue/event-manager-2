import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.name && form.email && form.password) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message || "Account created successfully! 🎉");

          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          // ✅ Let Navbar know about user
          window.dispatchEvent(new Event("userUpdated"));

          setTimeout(() => navigate("/"), 1500);
        } else {
          toast.error(data.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
        console.error("Signup error:", error);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-purple-900 to-black bg-400 animate-sky-glow flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 text-white animate-throw-up">
        <h2 className="text-3xl font-extrabold text-center mb-6 animate-fade-in-up">
          Create Account 📝
        </h2>
        <form onSubmit={handleSignup} className="space-y-6 animate-fade-in-up">
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-teal-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-teal-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-teal-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-teal-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
