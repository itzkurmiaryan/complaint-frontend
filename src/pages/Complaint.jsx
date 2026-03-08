import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

export default function Complaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    otherCategory: "",
    location: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImages(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append(
        "category",
        form.category === "Others" ? form.otherCategory : form.category
      );
      formData.append("location", form.location);

      for (let i = 0; i < images.length; i++) formData.append("images", images[i]);

      const res = await API.post("/api/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Complaint Submitted! Your Track ID: ${res.data.complaintId}`);

      setForm({
        title: "",
        description: "",
        category: "",
        otherCategory: "",
        location: "",
      });
      setImages([]);
      navigate("/my-complaints");
    } catch (err) {
      console.log("Complaint Submit Error:", err);
      alert(err.response?.data?.msg || "Complaint submit failed");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-3xl p-8 mx-auto bg-white shadow rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-indigo-600">
          Submit Campus Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <textarea
            name="description"
            placeholder="Describe the issue"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          >
            <option value="">Select Category</option>
            <option>Hostel Issues</option>
            <option>Mess Food</option>
            <option>Electricity</option>
            <option>Water Problem</option>
            <option>Internet / WiFi</option>
            <option>Classroom Infrastructure</option>
            <option>Library Issues</option>
            <option>Cleanliness</option>
            <option>Security</option>
            <option>Ragging</option>
            <option>Harassment</option>
            <option>Transport</option>
            <option>Others</option>
          </select>
          {form.category === "Others" && (
            <input
              type="text"
              name="otherCategory"
              placeholder="Enter Complaint Category"
              value={form.otherCategory}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          )}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <input type="file" multiple onChange={handleImageChange} />
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}