import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axiosConfig";

export default function TrackStatus() {

  const token = localStorage.getItem("token");
  const [trackId, setTrackId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("trackId");
    if (id) {
      setTrackId(id);
      fetchComplaint(id);
    }
  }, [searchParams]);

  const fetchComplaint = async (id) => {
    try {

      setError("");
      setComplaint(null);

      const res = await API.get(`/api/complaints/track/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComplaint(res.data);

    } catch (err) {

      console.log("Track Status Error:", err);
      setError(err.response?.data?.msg || "Error fetching complaint");

    }
  };

  const handleTrack = () => {
    if (!trackId) return setError("Please enter a Track ID");
    fetchComplaint(trackId);
  };

  return (

    <div className="flex flex-col items-center min-h-screen px-4 pt-20 sm:px-6 md:px-10 bg-gradient-to-b from-indigo-50 to-white">

      <h2 className="mb-6 text-3xl font-bold text-center text-indigo-600 sm:text-4xl">
        Track Complaint Status
      </h2>

      <div className="flex flex-col w-full max-w-md gap-3 mb-6 sm:flex-row">

        <input
          type="text"
          placeholder="Enter Track ID"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className="flex-1 p-3 border rounded"
        />

        <button
          onClick={handleTrack}
          className="px-6 py-3 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Track
        </button>

      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {complaint && (

        <div className="flex flex-col w-full max-w-2xl gap-3 p-6 bg-white shadow rounded-xl">

          <h3 className="text-xl font-bold">{complaint.title}</h3>

          <p><strong>Category:</strong> {complaint.category}</p>

          <p><strong>Location:</strong> {complaint.location}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-semibold ${
              complaint.status === "Pending"
                ? "text-yellow-600"
                : complaint.status === "In Progress"
                ? "text-blue-600"
                : complaint.status === "Resolved"
                ? "text-green-600"
                : "text-red-600"
            }`}>
              {complaint.status}
            </span>
          </p>

          <p>
            <strong>Submitted On:</strong>{" "}
            {new Date(complaint.createdAt).toLocaleString()}
          </p>

          {complaint.images?.length > 0 && (

            <div>

              <strong>Images:</strong>

              <div className="flex flex-wrap gap-2 mt-2">

                {complaint.images.map((img, i) => (

                  <img
                    key={i}
                    src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
                    alt="complaint"
                    className="object-cover w-24 h-24 rounded"
                  />

                ))}

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
}