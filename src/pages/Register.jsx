import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axiosConfig"; // ✅ use central API

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    course: "",
    year: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      setMsg("⚠️ You must confirm that all details are correct before registering.");
      return;
    }

    try {
      const res = await API.post("/api/auth/register", form);

      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(res.data.student));

      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white shadow-2xl sm:p-10 rounded-3xl"
      >

        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          Student Registration
        </h2>

        {/* Instructions */}
        <div className="p-4 mb-6 text-sm text-gray-800 border-l-4 border-yellow-500 rounded bg-yellow-50">
          <p>⚠️ <b>Important Instructions:</b></p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Use the same <b>Student ID and Password</b> as your ERP system.</li>
            <li>Double-check all details before submitting.</li>
            <li>Providing false information may lead to <b>strict penalties</b>.</li>
          </ul>
        </div>

        {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {["name","studentId","course","year","email","mobile","password"].map(field => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border outline-none rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          ))}

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">
              I confirm that all details are correct.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white transition bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:scale-105"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-indigo-600">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}