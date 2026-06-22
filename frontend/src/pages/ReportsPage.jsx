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
      .catch(() => setReports([
  { id: 'rep-1', title: 'Monthly Revenue Report', type: 'Financial', date: '2025-06-01', status: 'completed' },
  { id: 'rep-2', title: 'Student Enrollment Analysis Q2', type: 'Analytics', date: '2025-05-28', status: 'completed' },
  { id: 'rep-3', title: 'Course Completion Rates', type: 'Academic', date: '2025-05-15', status: 'completed' },
  { id: 'rep-4', title: 'Instructor Performance Review', type: 'HR', date: '2025-04-20', status: 'completed' },
  { id: 'rep-5', title: 'Platform Traffic & Engagement', type: 'Analytics', date: '2025-06-10', status: 'pending' },
  { id: 'rep-6', title: 'Refund & Cancellation Summary', type: 'Financial', date: '2025-03-30', status: 'completed' },
]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block text-stone-900">📋 LMS Reports</span>
            <span className="text-xs block text-stone-700">
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
            <h3 className="text-sm text-stone-700">Completed Reports</h3>
          </div>
          <p className="text-2xl font-semibold mt-3 text-stone-900">
            {reports.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-stone-500">
            <div className="p-2 rounded-lg bg-amber-100">
              <FiClock className="text-amber-600" />
            </div>
            <h3 className="text-sm text-stone-700">Pending Reports</h3>
          </div>
          <p className="text-2xl font-semibold mt-3 text-stone-900">
            {reports.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-stone-500">
            <div className="p-2 rounded-lg bg-stone-100">
              <FiFileText className="text-stone-600" />
            </div>
            <h3 className="text-sm text-stone-700">Total Reports</h3>
          </div>
          <p className="text-2xl font-semibold mt-3 text-stone-900">{reports.length}</p>
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="p-8 text-center text-stone-700">Loading reports...</div>
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
                <p className="text-xs text-stone-700 mb-3">{r.type}</p>
                <div className="text-xs text-stone-600 flex items-center gap-1">
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
