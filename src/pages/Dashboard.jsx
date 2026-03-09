import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardList, Clock, Loader, CheckCircle, PlusCircle, List } from "lucide-react";
import API from "../api/axiosConfig";

export default function Dashboard() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const student = JSON.parse(localStorage.getItem("student"));

  const [complaints, setComplaints] = useState([]);
  const [points,setPoints] = useState(0);
  const [badge,setBadge] = useState("New Citizen");

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    fetchComplaints();

    const interval = setInterval(fetchComplaints,5000);

    return () => clearInterval(interval);

  }, []);


  const fetchComplaints = async () => {

    try {

      const res = await API.get("/api/complaints/my", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data || [];

      setComplaints(data);

      /* Calculate points */

      const solved = data.filter(c => c.status === "Resolved").length;

      const calculatedPoints = solved * 10;

      setPoints(calculatedPoints);

      /* Badge Logic */

      let badgeLevel = "New Citizen";

      if(calculatedPoints >=100) badgeLevel="🥉 Bronze Leader";
      if(calculatedPoints >=200) badgeLevel="🥈 Silver Leader";
      if(calculatedPoints >=500) badgeLevel="🥇 Gold Leader";
      if(calculatedPoints >=1000) badgeLevel="👑 Platinum Civic Hero";

      setBadge(badgeLevel);

    } catch (err) {

      console.log("Fetch Complaints Error:", err);

    }

  };


  const total = complaints?.length || 0;
  const pending = complaints?.filter(c => c.status === "Pending").length || 0;
  const inProgress = complaints?.filter(c => c.status === "In Progress").length || 0;
  const resolved = complaints?.filter(c => c.status === "Resolved").length || 0;



  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 pt-20 sm:px-6 md:px-10 bg-gradient-to-br from-indigo-50 to-white"
    >

      {/* PROFILE */}

      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="flex flex-col items-start justify-between p-6 mb-8 bg-white shadow-lg sm:flex-row sm:items-center rounded-2xl"
      >

        <div>

          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Welcome, {student?.name} 👋
          </h2>

          <p className="text-gray-600">{student?.email}</p>

          <p className="mt-2 text-sm font-semibold text-green-600">
            ● Active Account
          </p>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            🏅 Badge: {badge}
          </p>

        </div>

        <span className="px-5 py-2 mt-4 text-white bg-indigo-600 rounded-full shadow-md sm:mt-0">
          CITIZEN
        </span>

      </motion.div>



      {/* STATS */}

      <div className="grid gap-6 mb-10 sm:grid-cols-2 md:grid-cols-5">

        <StatCard title="Total Complaints" value={total} icon={<ClipboardList />} color="indigo" />

        <StatCard title="Pending" value={pending} icon={<Clock />} color="yellow" />

        <StatCard title="In Progress" value={inProgress} icon={<Loader />} color="blue" />

        <StatCard title="Resolved" value={resolved} icon={<CheckCircle />} color="green" />

        <StatCard title="Leadership Points" value={points} icon={<CheckCircle />} color="green" />

      </div>



      {/* ACTIONS */}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

        <ActionCard
          title="New Complaint"
          desc="Register a new complaint"
          icon={<PlusCircle />}
          onClick={() => navigate("/complaint")}
        />

        <ActionCard
          title="My Complaints"
          desc="View all complaints"
          icon={<List />}
          onClick={() => navigate("/my-complaints")}
        />

        <ActionCard
          title="Track Status"
          desc="Check complaint progress"
          icon={<Clock />}
          onClick={() => navigate("/track-status")}
        />

      </div>

    </motion.div>

  );

}



function StatCard({ title, value, icon, color }) {

  const colors = {
    indigo: "bg-indigo-500 text-white",
    yellow: "bg-yellow-500 text-white",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white"
  };

  return (

    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className={`p-6 rounded-2xl shadow-lg ${colors[color]} flex justify-between items-center`}
    >

      <div>

        <p className="text-sm font-medium">{title}</p>

        <p className="mt-2 text-3xl font-bold sm:text-4xl">{value}</p>

      </div>

      <div className="text-3xl opacity-80">{icon}</div>

    </motion.div>

  );

}



function ActionCard({ title, desc, icon, onClick }) {

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="flex flex-col items-start justify-between p-6 transition bg-white shadow-md cursor-pointer sm:flex-row sm:items-center rounded-2xl hover:shadow-xl"
    >

      <div>

        <h4 className="font-bold">{title}</h4>

        <p className="mt-1 text-sm text-gray-500">{desc}</p>

      </div>

      <div className="mt-3 text-2xl text-indigo-600 sm:mt-0">{icon}</div>

    </motion.div>

  );

}