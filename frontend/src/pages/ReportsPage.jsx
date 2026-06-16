import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiActivity,
  FiPieChart,
} from "react-icons/fi";

const typeIcons = {
  Financial: FiTrendingUp,
  Analytics: FiPieChart,
  Academic: FiFileText,
  HR: FiActivity,
};

const statusStyle = (status) =>
  status === "completed"
    ? "bg-green-100 text-green-700"
    : "bg-amber-100 text-amber-700";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/admin/reports")
      .then((r) => setReports(r.data.reports || []))
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block">📋 LMS Reports</span>
            <span className="text-xs block text-stone-500">
              Generated reports and analytics summaries
            </span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-stone-500">
            <div className="p-2 rounded-lg bg-green-100">
              <FiCheckCircle className="text-green-600" />
            </div>
            <h3 className="text-sm">Completed Reports</h3>
          </div>
          <p className="text-2xl font-semibold mt-3">
            {reports.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-stone-500">
            <div className="p-2 rounded-lg bg-amber-100">
              <FiClock className="text-amber-600" />
            </div>
            <h3 className="text-sm">Pending Reports</h3>
          </div>
          <p className="text-2xl font-semibold mt-3">
            {reports.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-stone-500">
            <div className="p-2 rounded-lg bg-stone-100">
              <FiFileText className="text-stone-600" />
            </div>
            <h3 className="text-sm">Total Reports</h3>
          </div>
          <p className="text-2xl font-semibold mt-3">{reports.length}</p>
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="p-8 text-center text-stone-500">Loading reports...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((r) => {
            const Icon = typeIcons[r.type] || FiFileText;
            return (
              <div
                key={r.id}
                className="rounded border border-stone-300 bg-white p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-violet-50">
                    <Icon className="text-violet-500" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </div>
                <h4 className="font-medium text-stone-900 mb-1">{r.title}</h4>
                <p className="text-xs text-stone-500 mb-3">{r.type}</p>
                <div className="text-xs text-stone-400 flex items-center gap-1">
                  <FiClock size={10} />
                  Generated: {new Date(r.date).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
