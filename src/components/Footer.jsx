import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";
import iuLogo from "../assets/iu.png"; // make sure the logo is in this path

export default function Footer() {
  return (
    <footer className="mt-20 border-t shadow-inner bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">

      {/* Main Footer */}
      <div className="grid gap-10 px-6 py-12 mx-auto max-w-7xl md:grid-cols-3">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <img src={iuLogo} alt="Invertis University" className="mb-4 w-28" />
          <h2 className="mb-2 text-xl font-bold text-indigo-600">
            Invertis Campus Care
          </h2>
          <p className="text-sm text-gray-600">
            A modern complaint management platform for transparency, safety, and accountability.
          </p>
          <div className="flex mt-4 space-x-4 text-gray-600">
            <a
              href="https://www.instagram.com/invertis.university/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/CampusLifeAtInvertis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition hover:text-green-600"
            >
              <FaGlobe />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="mb-4 font-semibold text-gray-800">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="transition hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/complaint" className="transition hover:text-indigo-600">
                Report Issue
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="transition hover:text-indigo-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="transition hover:text-indigo-600">
                Login
              </Link>
            </li>
                        <li>
              <Link to="/Register" className="transition hover:text-indigo-600">
                Register
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="mb-4 font-semibold text-gray-800">Contact</h3>
          <p className="text-sm text-gray-600">
            Invertis University<br />
            Bareilly, Uttar Pradesh<br />
            <a
              href="mailto:support@invertiscampuscare.com"
              className="transition hover:text-indigo-600"
            >
              support@invertiscampuscare.com
            </a>
          </p>
        </motion.div>

      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-6 text-sm text-center text-gray-500 border-t border-gray-200"
      >
        © 2026 Invertis Campus Care. All rights reserved.
      </motion.div>

      {/* Designed & Developed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="py-2 text-sm text-center text-gray-600"
      >
        Designed & Developed by{" "}
        <a
          href="https://alphaaryx.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-orange-400 transition hover:text-orange-500"
        >
          AlphaAryx (Aryan)
        </a>
      </motion.div>

    </footer>
  );
}