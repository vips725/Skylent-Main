import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiUsers,
  FiUser,
  FiTrash2,
  FiCalendar,
  FiBookOpen,
  FiZap,
  FiActivity,
  FiEdit2,
} from "react-icons/fi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then((r) => setUsers(r.data.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Failed to delete user.");
    }
  };

  const statusBadge = (status) => {
    if (status === "active")
      return "bg-emerald-500/15 text-emerald-700 border-emerald-500/20";
    return "bg-stone-400/15 text-stone-600 border-stone-400/20";
  };

  const roleDot = (role) => {
    const map = {
      admin: "bg-violet-500",
      student: "bg-blue-500",
      organization: "bg-amber-500",
    };
    return map[role] || "bg-stone-400";
  };

  const completionColor = (value) => {
    if (value >= 80) return "bg-emerald-500";
    if (value >= 50) return "bg-blue-500";
    if (value >= 30) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="border-b px-4 mb-2 mt-2 pb-4 border-white/20">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block text-stone-800">👥 Users</span>
            <span className="text-xs block text-stone-500">
              Manage platform users and roles
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 px-1">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-md text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition"
          />
        </div>
        <div className="text-sm text-stone-500">
          Total:{" "}
          <span className="font-semibold text-stone-800">{filtered.length}</span>
        </div>
      </div>

      {/* Glassy Table Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/50 backdrop-blur-xl shadow-lg shadow-stone-200/40">
        {/* subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-stone-100/20 pointer-events-none" />

        {loading ? (
          <div className="relative p-10 text-center text-stone-500">
            <div className="w-6 h-6 border-2 border-stone-300 border-t-violet-500 rounded-full animate-spin mx-auto mb-3" />
            Loading users...
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/30 bg-white/30 backdrop-blur-md">
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600">
                    <span className="inline-flex items-center gap-1.5">
                      <FiUser className="text-stone-400" size={14} />
                      User
                    </span>
                  </th>
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="text-stone-400" size={14} />
                      Joined
                    </span>
                  </th>
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600">
                    <span className="inline-flex items-center gap-1.5">
                      <FiBookOpen className="text-stone-400" size={14} />
                      Courses
                    </span>
                  </th>
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600">
                    Completion
                  </th>
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600">
                    <span className="inline-flex items-center gap-1.5">
                      <FiZap className="text-stone-400" size={14} />
                      Streak
                    </span>
                  </th>
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600">
                    <span className="inline-flex items-center gap-1.5">
                      <FiActivity className="text-stone-400" size={14} />
                      Status
                    </span>
                  </th>
                  <th className="text-left px-4 py-3.5 font-semibold text-stone-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/20 hover:bg-white/40 transition-colors duration-200"
                  >
                    {/* User */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 flex items-center justify-center text-xs font-bold text-violet-700 shadow-sm">
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">{u.name}</p>
                          <p className="text-xs text-stone-500">{u.email}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span
                              className={`inline-block w-1.5 h-1.5 rounded-full ${roleDot(
                                u.role
                              )}`}
                            />
                            <span className="text-[10px] text-stone-400 capitalize">
                              {u.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3.5 text-stone-600 whitespace-nowrap">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Courses */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 text-xs font-semibold border border-blue-500/15">
                        {u.enrolledCourses?.length ?? 0}
                        <span className="text-blue-400 font-normal">courses</span>
                      </span>
                    </td>

                    {/* Completion */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-2 bg-stone-200/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${completionColor(
                              u.completion || 0
                            )} rounded-full transition-all duration-500`}
                            style={{ width: `${u.completion ?? 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-stone-600 w-8 text-right">
                          {u.completion ?? 0}%
                        </span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-stone-700 text-sm">
                        <FiZap
                          className={
                            (u.streak || 0) > 5
                              ? "text-amber-500"
                              : "text-stone-400"
                          }
                          size={15}
                        />
                        <span className="font-semibold">{u.streak ?? 0}</span>
                        <span className="text-stone-400 text-xs">days</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusBadge(
                          u.status
                        )}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === "active"
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-stone-400"
                          }`}
                        />
                        {u.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-lg text-stone-400 hover:text-blue-600 hover:bg-blue-500/10 transition"
                          onClick={() => alert(`Edit user: ${u.name}\n(Not yet implemented)`)}
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-500/10 transition"
                          onClick={() => handleDelete(u.id)}
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="relative p-10 text-center text-stone-400">
            <FiUsers className="mx-auto mb-2 text-2xl" />
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
