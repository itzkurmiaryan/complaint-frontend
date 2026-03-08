import React, { useEffect, useState } from "react";
import DashboardStats from "../components/DashboardStats";
import UsersTable from "../components/UsersTable";
import ComplaintsTable from "../components/ComplaintsTable";
import Leaderboard from "../components/Leaderboard";
import API from "../api/axiosConfig"; // centralized axios

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [leaders, setLeaders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showUsers, setShowUsers] = useState(false);
  const [showComplaints, setShowComplaints] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [editedPoints, setEditedPoints] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    studentId: "",
    email: "",
    password: "",
    role: "student",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchComplaints(), fetchLeaderboard()]);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      setLoading(false);
    }
  };

  /* USERS */
  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Users Error:", err);
    }
  };

  /* COMPLAINTS */
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/api/admin/complaints");
      setComplaints(res.data || []);
    } catch (err) {
      console.error("Complaints Error:", err);
    }
  };

  /* LEADERBOARD */
  const fetchLeaderboard = async () => {
    try {
      const res = await API.get("/api/admin/leaderboard");
      setLeaders(res.data || []);
    } catch (err) {
      console.error("Leaderboard Error:", err);
    }
  };

  /* CREATE USER */
  const createUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/admin/users", newUser);
      setNewUser({
        name: "",
        studentId: "",
        email: "",
        password: "",
        role: "student",
      });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Create User Error:", err);
    }
  };

  /* CHANGE POINTS */
  const changePoints = async (id, points) => {
    try {
      await API.put(`/api/admin/users/${id}/points`, { points });
      fetchUsers();
      fetchLeaderboard();
    } catch (err) {
      console.error("Change Points Error:", err);
    }
  };

  /* RESET POINTS */
  const resetPoints = async (id) => {
    try {
      await API.put(`/api/admin/users/${id}/points`, { points: 0 });
      fetchUsers();
      fetchLeaderboard();
    } catch (err) {
      console.error("Reset Points Error:", err);
    }
  };

  /* DELETE USER */
  const deleteUser = async (id) => {
    try {
      await API.delete(`/api/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete User Error:", err);
    }
  };

  /* DELETE COMPLAINT */
  const deleteComplaint = async (id) => {
    try {
      await API.delete(`/api/admin/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      console.error("Delete Complaint Error:", err);
    }
  };

  /* UPDATE COMPLAINT STATUS */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/api/admin/complaints/${id}`, { status });
      fetchComplaints();
      fetchLeaderboard();
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-bold">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-24 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">🔥 Admin Dashboard</h1>

      <DashboardStats users={users} complaints={complaints} />

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          ➕ Create User
        </button>

        <button
          onClick={() => setShowUsers(!showUsers)}
          className="px-6 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          👨‍🎓 View Users
        </button>

        <button
          onClick={() => setShowComplaints(!showComplaints)}
          className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          📢 View Complaints
        </button>

        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          🏆 Student Leaderboard
        </button>
      </div>

      {/* CREATE USER FORM */}
      {showForm && (
        <form onSubmit={createUser} className="p-6 mb-8 bg-white rounded shadow">
          <h2 className="mb-4 text-xl font-bold">➕ Create New User</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Student ID"
              value={newUser.studentId}
              onChange={(e) => setNewUser({ ...newUser, studentId: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="p-2 border rounded"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Create User
          </button>
        </form>
      )}

      {/* LEADERBOARD */}
      {showLeaderboard && <Leaderboard leaders={leaders} />}

      {/* USERS */}
      {showUsers && (
        <UsersTable
          users={users}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          editedPoints={editedPoints}
          setEditedPoints={setEditedPoints}
          changePoints={changePoints}
          resetPoints={resetPoints}
          deleteUser={deleteUser}
        />
      )}

      {/* COMPLAINTS */}
      {showComplaints && (
        <ComplaintsTable
          complaints={complaints}
          updateStatus={updateStatus}
          deleteComplaint={deleteComplaint}
        />
      )}
    </div>
  );
}

export default AdminDashboard;