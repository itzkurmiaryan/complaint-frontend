// src/pages/MyComplaints.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig"; // ✅ centralized Axios

export default function MyComplaints() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/api/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.log("Fetch My Complaints Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await API.delete(`/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComplaints();
    } catch (err) {
      console.log("Delete Error:", err);
      alert("Failed to delete complaint");
    }
  };

  const handleEdit = (complaint) => {
    navigate("/complaint", { state: { complaint } });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-indigo-600">My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <table className="w-full border border-collapse border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Track ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Submitted On</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} className="text-center border">
                <td className="p-2 font-mono text-indigo-600 border">{c.complaintId}</td>
                <td className="p-2 border">{c.title}</td>
                <td className="p-2 border">{c.category}</td>
                <td className="p-2 border">{c.location}</td>
                <td
                  className={`p-2 border font-semibold ${
                    c.status === "Pending"
                      ? "text-yellow-600"
                      : c.status === "In Progress"
                      ? "text-blue-600"
                      : c.status === "Resolved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {c.status}
                </td>
                <td className="p-2 border">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="flex justify-center gap-2 p-2 border">
                  <button
                    onClick={() => handleEdit(c)}
                    className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}