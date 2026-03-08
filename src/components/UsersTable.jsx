import { useState } from "react";
import API from "../api/axiosConfig";

function ShowPassword() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <span>{visible ? "Temporary Password Hidden" : "********"}</span>
      <button
        className="px-2 py-1 text-white bg-gray-500 rounded"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

function UsersTable({
  users = [],
  editingUser,
  setEditingUser,
  editedPoints,
  setEditedPoints,
  changePoints,
  resetPoints,
  deleteUser
}) {

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  /* SEARCH */
  let filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.studentId?.toLowerCase().includes(search.toLowerCase())
  );

  /* FILTER */
  if (roleFilter !== "All") {
    filteredUsers = filteredUsers.filter((user) => user.role === roleFilter);
  }

  /* PAGINATION */
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  /* RESET PASSWORD */
  const resetPassword = async (userId) => {

    const temp = prompt("Enter temporary password:");

    if (!temp) return;

    try {

      const res = await API.put(`/users/${userId}/reset-password`, {
        tempPassword: temp
      });

      alert(`Password reset successful!\nTemp Password: ${res.data.tempPassword}`);

    } catch (err) {

      alert("Error resetting password");

    }

  };

  return (

    <div className="p-6 mb-10 bg-white shadow-xl rounded-2xl">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        👨‍🎓 User Management
      </h2>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4 mb-5">

        <input
          type="text"
          placeholder="🔍 Search user"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded"
        >
          <option value="All">All Roles</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="text-left bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Student ID</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3 text-center">Points</th>
              <th className="p-3 text-center">Password</th>
              <th className="p-3 text-center">Edit</th>
              <th className="p-3 text-center">Reset</th>
              <th className="p-3 text-center">Delete</th>
            </tr>

          </thead>

          <tbody>

            {currentUsers.length === 0 ? (

              <tr>
                <td colSpan="10" className="p-5 text-center text-gray-500">
                  No users found
                </td>
              </tr>

            ) : (

              currentUsers.map((user) => (

                <tr key={user._id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.studentId}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone || "Not Set"}</td>

                  <td className="p-3 text-center">

                    {editingUser === user._id ? (

                      <div className="flex justify-center gap-2">

                        <input
                          type="number"
                          value={editedPoints}
                          onChange={(e) => setEditedPoints(e.target.value)}
                          className="w-20 p-1 border rounded"
                        />

                        <button
                          onClick={() => {
                            changePoints(user._id, editedPoints);
                            setEditingUser(null);
                          }}
                          className="px-2 py-1 text-white bg-green-600 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingUser(null)}
                          className="px-2 py-1 text-white bg-gray-500 rounded"
                        >
                          Cancel
                        </button>

                      </div>

                    ) : (

                      <span className="font-bold text-indigo-700">
                        ⭐ {user.points ?? 0}
                      </span>

                    )}

                  </td>

                  <td className="text-center">
                    <ShowPassword />
                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => {
                        setEditingUser(user._id);
                        setEditedPoints(user.points ?? 0);
                      }}
                      className="px-4 py-1 text-white bg-blue-600 rounded"
                    >
                      Edit
                    </button>

                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => resetPassword(user._id)}
                      className="px-4 py-1 text-white bg-purple-600 rounded"
                    >
                      Reset Password
                    </button>

                  </td>

                  <td className="text-center">

                    {user.role !== "admin" && (

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-4 py-1 text-white bg-red-600 rounded"
                      >
                        Delete
                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-center gap-6 mt-5">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-1 text-white bg-gray-600 rounded disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="font-bold">
          Page {currentPage} / {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-1 text-white bg-gray-600 rounded disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>

    </div>
  );
}

export default UsersTable;