import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ⚡ IMPORTANT

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const student = JSON.parse(localStorage.getItem("student"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const dashboardLink = student?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <nav className="fixed top-0 z-50 w-full border-b shadow-md bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/iu.png"
            alt="Invertis Logo"
            className="object-contain w-10 h-10"
          />
          <span className="text-xl font-bold text-indigo-600">
            Invertis Campus Care
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-8 md:flex">
          <Link to="/" className="transition hover:text-indigo-600">Home</Link>

          {token ? (
            <>
              <Link
                to={dashboardLink}
                className="flex items-center gap-2 transition hover:text-indigo-600"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>

              {student?.role !== "admin" && (
                <Link to="/complaint" className="transition hover:text-indigo-600">
                  Report
                </Link>
              )}

              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500 transition hover:text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="transition hover:text-indigo-600">Login</Link>
              <Link
                to="/register"
                className="px-5 py-2 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 px-6 pb-4 overflow-hidden bg-white shadow-md md:hidden"
          >
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-2 transition hover:text-indigo-600"
            >
              Home
            </Link>

            {token ? (
              <>
                <Link
                  to={dashboardLink}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 transition hover:text-indigo-600"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>

                {student?.role !== "admin" && (
                  <Link
                    to="/complaint"
                    onClick={() => setOpen(false)}
                    className="py-2 transition hover:text-indigo-600"
                  >
                    Report
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="py-2 text-red-500 transition hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="py-2 transition hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}