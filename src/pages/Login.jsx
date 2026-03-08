// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axiosConfig"; // ✅ use centralized Axios

export default function Login() {
  const [form, setForm] = useState({ studentId: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", form);

      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(res.data.student));

      // ⭐ ADMIN ROLE CHECK
      if (res.data.student.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Invalid Credentials");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen px-4 py-8 sm:items-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 sm:px-6 lg:px-8 sm:py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md overflow-auto max-h-[90vh]"
      >
        <h2 className="sticky top-0 z-10 py-2 mb-6 text-2xl font-bold text-center text-indigo-600 bg-white sm:text-3xl">
          Student Login
        </h2>

        <div className="p-4 mb-6 text-sm text-gray-700 border-l-4 border-indigo-500 rounded-lg sm:text-base bg-gray-50">
          <p>🔐 Please login using your registered Student ID.</p>
          <p>• Password must be the same as your ERP password.</p>
          <p>• Only verified students can access dashboard and submit complaints.</p>
        </div>

        {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-base"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-base"
          />

          <button
            type="submit"
            className="w-full py-3 text-sm text-white transition bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:scale-105 sm:text-base"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 sm:text-base">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium text-indigo-600">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}