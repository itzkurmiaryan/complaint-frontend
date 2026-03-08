import { useState } from "react";

function ComplaintsTable({ complaints = [], updateStatus, deleteComplaint }) {

const [search,setSearch] = useState("");
const [statusFilter,setStatusFilter] = useState("All");
const [page,setPage] = useState(1);

const complaintsPerPage = 8;

/* SEARCH + FILTER */

let filtered = complaints.filter(c =>
(c.title?.toLowerCase() || "").includes(search.toLowerCase())
);

if(statusFilter !== "All"){
filtered = filtered.filter(c => c.status === statusFilter);
}

/* PAGINATION */

const lastIndex = page * complaintsPerPage;
const firstIndex = lastIndex - complaintsPerPage;

const currentComplaints = filtered.slice(firstIndex,lastIndex);

const totalPages = Math.ceil(filtered.length / complaintsPerPage) || 1;

return(

<div className="p-6 bg-white shadow-xl rounded-2xl">

<h2 className="mb-5 text-2xl font-bold text-gray-800">
📢 Complaints Management
</h2>

{/* SEARCH + FILTER */}

<div className="flex flex-wrap gap-4 mb-5">

<input
type="text"
placeholder="🔍 Search complaint..."
value={search}
onChange={(e)=>{
setSearch(e.target.value);
setPage(1);
}}
className="p-2 border rounded"
/>

<select
value={statusFilter}
onChange={(e)=>{
setStatusFilter(e.target.value);
setPage(1);
}}
className="p-2 border rounded"
>

<option value="All">All Status</option>
<option value="Pending">Pending</option>
<option value="In Progress">In Progress</option>
<option value="Resolved">Resolved</option>
<option value="Rejected">Rejected</option>

</select>

</div>

<div className="overflow-x-auto">

<table className="w-full border rounded-lg">

<thead>

<tr className="text-left bg-gray-100">

<th className="p-3">Track ID</th>
<th className="p-3">Title</th>
<th className="p-3">Student</th>
<th className="p-3">Priority</th>
<th className="p-3">Status</th>
<th className="p-3">Update</th>
<th className="p-3">Delete</th>

</tr>

</thead>

<tbody>

{currentComplaints.length === 0 ? (

<tr>
<td colSpan="7" className="p-4 text-center text-gray-500">
No complaints found
</td>
</tr>

) : (

currentComplaints.map((c)=>(

<tr key={c._id} className="text-center border hover:bg-gray-50">

<td>{c.complaintId}</td>

<td className="font-medium">
{c.title || "No Title"}
</td>

<td>
{c.student?.name || "Unknown"}
</td>

<td>

{c.priority==="Urgent"
?
<span className="font-bold text-red-600">
🚨 URGENT
</span>
:
<span className="text-green-600">
Normal
</span>
}

</td>

<td>

<span className={`px-2 py-1 rounded text-white text-sm

${c.status==="Pending" && "bg-yellow-500"}
${c.status==="In Progress" && "bg-blue-500"}
${c.status==="Resolved" && "bg-green-600"}
${c.status==="Rejected" && "bg-red-600"}

`}>

{c.status}

</span>

</td>

<td>

<select
value={c.status}
onChange={(e)=>updateStatus(c._id,e.target.value)}
className="p-1 border rounded"
>

<option>Pending</option>
<option>In Progress</option>
<option>Resolved</option>
<option>Rejected</option>

</select>

</td>

<td>

<button
onClick={()=>deleteComplaint(c._id)}
className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
>
Delete
</button>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

{/* PAGINATION */}

<div className="flex items-center justify-center gap-6 mt-6">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
className="px-4 py-1 text-white bg-gray-600 rounded disabled:opacity-40"
>
⬅ Prev
</button>

<span className="font-bold">
Page {page} / {totalPages}
</span>

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
className="px-4 py-1 text-white bg-gray-600 rounded disabled:opacity-40"
>
Next ➡
</button>

</div>

</div>

);
}

export default ComplaintsTable;