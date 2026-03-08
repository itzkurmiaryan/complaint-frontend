function DashboardStats({ users, complaints }) {

return (

<div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 md:grid-cols-4">

<div className="p-6 text-white bg-indigo-600 rounded-lg">
<h2>Total Users</h2>
<p className="text-3xl font-bold">{users.length}</p>
</div>

<div className="p-6 text-white bg-purple-600 rounded-lg">
<h2>Total Complaints</h2>
<p className="text-3xl font-bold">{complaints.length}</p>
</div>

<div className="p-6 text-white bg-yellow-500 rounded-lg">
<h2>Pending</h2>
<p className="text-3xl font-bold">
{complaints.filter(c=>c.status==="Pending").length}
</p>
</div>

<div className="p-6 text-white bg-green-600 rounded-lg">
<h2>Resolved</h2>
<p className="text-3xl font-bold">
{complaints.filter(c=>c.status==="Resolved").length}
</p>
</div>

</div>

);
}

export default DashboardStats;