import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import MyComplaints from "./pages/MyComplaints";
import TrackStatus from "./pages/TrackStatus";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (

    <Router>

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* COMPLAINT SUBMIT */}

        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <Complaint />
            </ProtectedRoute>
          }
        />

        {/* MY COMPLAINTS */}

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        {/* TRACK STATUS */}

        <Route
          path="/track-status"
          element={
            <ProtectedRoute>
              <TrackStatus />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 PAGE */}

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />

    </Router>

  );

}

export default App;