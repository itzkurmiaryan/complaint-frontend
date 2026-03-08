import { useState } from "react";

function Leaderboard({ leaders = [] }) {

  const [leaderFilter, setLeaderFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 8;

  /* FILTER + SORT */

  let filteredLeaders = [...leaders];

  if (leaderFilter === "Top") {
    filteredLeaders.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
  }

  else if (leaderFilter === "Low") {
    filteredLeaders.sort((a, b) => (a.points ?? 0) - (b.points ?? 0));
  }

  else if (leaderFilter === "New") {
    filteredLeaders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  /* SEARCH */

  filteredLeaders = filteredLeaders.filter((s) =>
    (s.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (s.studentId?.toLowerCase() || "").includes(search.toLowerCase())
  );

  /* PAGINATION */

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;

  const currentStudents = filteredLeaders.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredLeaders.length / studentsPerPage);

  return (

    <div className="p-6 mb-10 bg-white shadow-xl rounded-2xl">

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          🏆 Student Leaderboard
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="🔍 Search student"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded"
          />

          <select
            value={leaderFilter}
            onChange={(e) => {
              setLeaderFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Top">Top Rank</option>
            <option value="Low">Low Rank</option>
            <option value="New">Newest</option>
          </select>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border rounded-lg">

          <thead>

            <tr className="text-left bg-gray-100">
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Student ID</th>
              <th className="p-3">Points</th>
            </tr>

          </thead>

          <tbody>

            {currentStudents.length === 0 ? (

              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>

            ) : (

              currentStudents.map((s, index) => {

                const rank = indexOfFirst + index + 1;

                return (

                  <tr
                    key={s._id || index}
                    className={`border hover:bg-gray-50 text-center
                    ${rank === 1 ? "bg-yellow-50" : ""}
                    ${rank === 2 ? "bg-gray-50" : ""}
                    ${rank === 3 ? "bg-orange-50" : ""}
                    `}
                  >

                    <td className="p-3 font-bold">

                      {rank === 1 && "🥇"}
                      {rank === 2 && "🥈"}
                      {rank === 3 && "🥉"}
                      {rank > 3 && rank}

                    </td>

                    <td className="font-medium">
                      {s.name || "Unknown"}
                    </td>

                    <td>

                      <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                        {s.studentId || "N/A"}
                      </span>

                    </td>

                    <td>

                      <span className="px-3 py-1 font-bold text-indigo-700 bg-indigo-100 rounded-full">
                        ⭐ {s.points ?? 0}
                      </span>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-center gap-6 mt-6">

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
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-1 text-white bg-gray-600 rounded disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>

    </div>

  );
}

export default Leaderboard;