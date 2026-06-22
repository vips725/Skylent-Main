import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Layers,
  BarChart3,
  Briefcase,
  AlertTriangle,
  ChevronRight,
  Plus,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ─── animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const cardHover = {
  scale: 1.02,
  y: -3,
  transition: { type: "spring", stiffness: 300 },
};

/* ─── stat cards data ─── */
const stats = [
  {
    label: "Total Students",
    value: "85",
    subtitle: "+12 this month",
    icon: Users,
  },
  {
    label: "Active Batches",
    value: "3",
    subtitle: "1 graduating soon",
    icon: Layers,
  },
  {
    label: "Avg Completion",
    value: "74%",
    subtitle: "+6% vs last quarter",
    icon: BarChart3,
  },
  {
    label: "Students Placed",
    value: "48",
    subtitle: "56% placement rate",
    icon: Briefcase,
  },
];

/* ─── batch data ─── */
const batches = [
  {
    id: "2025-A",
    name: "Batch 2025-A",
    badge: "Active",
    badgeClass: "bg-emerald-100 text-emerald-700",
    course: "Full Stack Web Development",
    meta: "32 students • 18 placed",
    progress: 72,
  },
  {
    id: "2025-B",
    name: "Batch 2025-B",
    badge: "Active",
    badgeClass: "bg-emerald-100 text-emerald-700",
    course: "Data Science & ML",
    meta: "28 students • 8 placed",
    progress: 58,
  },
  {
    id: "2024-C",
    name: "Batch 2024-C",
    badge: "Completed",
    badgeClass: "bg-violet-100 text-violet-700",
    course: "Cloud & DevOps",
    meta: "25 students • 22 placed",
    progress: 94,
  },
];

/* ─── placement companies ─── */
const companies = [
  { name: "TCS", initial: "T", hired: "8 hired", package: "₹6-8L" },
  { name: "Wipro", initial: "W", hired: "5 hired", package: "₹5-7L" },
  { name: "Accenture", initial: "A", hired: "4 hired", package: "₹7-9L" },
  { name: "Deloitte", initial: "D", hired: "3 hired", package: "₹8-11L" },
  { name: "IBM", initial: "I", hired: "2 hired", package: "₹9-12L" },
];

/* ─── faculty data ─── */
const faculty = [
  { name: "Prof. Arjun Mehta", dept: "Technology", sessions: 48, rating: 4.8, status: "Active", statusClass: "bg-emerald-100 text-emerald-700" },
  { name: "Dr. Sanjay Patel", dept: "Data Science", sessions: 36, rating: 4.9, status: "Active", statusClass: "bg-emerald-100 text-emerald-700" },
  { name: "Priya Sharma", dept: "Full Stack", sessions: 52, rating: 4.7, status: "Active", statusClass: "bg-emerald-100 text-emerald-700" },
  { name: "Amit Verma", dept: "Marketing", sessions: 30, rating: 4.6, status: "On Leave", statusClass: "bg-amber-100 text-amber-700" },
];

/* ─── enrollment chart data ─── */
const enrollmentData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 22 },
  { name: "May", value: 19 },
  { name: "Jun", value: 28 },
];

/* ─── TopBar ─── */
const OrgTopBar = () => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-between pb-4 border-b border-stone-200"
  >
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800">
          Institution Dashboard
        </h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Tech Academy Admin — Partner Overview
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200">
        Active Partner
      </span>
    </div>
  </motion.div>
);

/* ─── Stat Cards Row ─── */
const OrgStatCards = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-stone-50 to-neutral-100 border border-stone-200/60 p-5">
    <div className="absolute -top-10 -right-10 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-4 relative"
    >
      {stats.map((card) => (
        <motion.div
          key={card.label}
          variants={itemVariants}
          whileHover={cardHover}
          className="p-5 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl hover:border-stone-200/80 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-violet-100 rounded-lg">
              <card.icon className="w-5 h-5 text-violet-600" />
            </div>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              {card.label}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-stone-800">
              {card.value}
            </span>
            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              {card.subtitle}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

/* ─── Alert Banner ─── */
const AlertBanner = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={itemVariants}
      className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4"
    >
      <div className="p-2.5 bg-amber-100 rounded-lg flex-shrink-0">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800">
          5 students haven&apos;t logged in for 7+ days
        </p>
        <p className="text-xs text-amber-600 mt-0.5">
          Consider reaching out to keep them engaged.
        </p>
      </div>
      <button
        onClick={() => navigate("/organization/students")}
        className="text-sm font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 whitespace-nowrap flex-shrink-0"
      >
        View Students <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

/* ─── Batch Performance Cards ─── */
const BatchPerformanceCards = () => (
  <motion.div variants={itemVariants} className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="w-1 h-5 bg-violet-400 rounded-full" />
      <h2 className="text-base font-semibold text-stone-700">Batch Performance</h2>
      <div className="flex-1 h-px bg-stone-200/60" />
    </div>
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-stone-50 to-neutral-100 border border-stone-200/60 p-5">
      <div className="absolute -top-8 -left-8 w-40 h-40 bg-sky-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {batches.map((batch) => (
          <motion.div
            key={batch.id}
            whileHover={cardHover}
            className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-stone-800">
                {batch.name}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${batch.badgeClass}`}>
                {batch.badge}
              </span>
            </div>
            <p className="text-sm text-stone-600 mb-1">
              {batch.course}
            </p>
            <p className="text-xs text-stone-400 mb-4">
              {batch.meta}
            </p>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-stone-500">Completion</span>
                <span className="text-xs font-semibold text-stone-700">
                  {batch.progress}%
                </span>
              </div>
              <div className="h-2 bg-stone-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500 shadow-sm shadow-violet-300/50"
                  style={{ width: `${batch.progress}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs font-medium text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg py-2 px-3 transition-colors">
                View Students
              </button>
              <button className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg py-2 px-3 transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg py-2 px-3 transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Placement Summary ─── */
const PlacementSummary = () => (
  <motion.div variants={itemVariants} className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="w-1 h-5 bg-emerald-400 rounded-full" />
      <h2 className="text-base font-semibold text-stone-700">Placement Summary</h2>
      <div className="flex-1 h-px bg-stone-200/60" />
    </div>
    <div className="flex flex-wrap gap-3">
      {companies.map((company) => (
        <motion.div
          key={company.name}
          whileHover={cardHover}
          className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 min-w-[160px] hover:shadow-xl transition-shadow"
        >
          <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
            {company.initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">
              {company.name}
            </p>
            <p className="text-xs text-stone-500">
              {company.hired}
            </p>
            <p className="text-xs font-medium text-stone-600">
              {company.package}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ─── Faculty Overview Table ─── */
const FacultyOverview = () => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="p-5 border-b border-white/20">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-amber-400 rounded-full" />
        <h2 className="text-base font-semibold text-stone-700">Faculty Overview</h2>
      </div>
      <p className="text-xs text-stone-500 mt-0.5 ml-3">
        4 active members
      </p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/30 bg-white/30 backdrop-blur-md">
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Name
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Department
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Sessions
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Rating
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((member, i) => (
            <tr
              key={i}
              className="border-b border-white/20 hover:bg-stone-50/80 hover:shadow-sm transition-all duration-200"
            >
              <td className="px-4 py-3.5">
                <span className="font-medium text-stone-800 whitespace-nowrap">
                  {member.name}
                </span>
              </td>
              <td className="px-4 py-3.5 text-stone-600">
                {member.dept}
              </td>
              <td className="px-4 py-3.5 text-stone-600">
                {member.sessions}
              </td>
              <td className="px-4 py-3.5">
                <span className="text-amber-600 font-semibold">
                  ★ {member.rating}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${member.statusClass}`}>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      member.status === "Active"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  {member.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

/* ─── Monthly Enrollment Trend Chart ─── */
const EnrollmentTrendChart = () => (
  <motion.div
    variants={itemVariants}
    className="border border-stone-200/80 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-sky-400 rounded-full" />
      <h2 className="text-base font-semibold text-stone-700">Monthly Enrollment Trend</h2>
    </div>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={enrollmentData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e7e5e4"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#78716c" }}
            axisLine={{ stroke: "#d6d3d1" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.95)",
              border: "1px solid #e7e5e4",
              borderRadius: "12px",
              fontSize: 13,
            }}
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
          />
          <Bar
            dataKey="value"
            fill="#8b5cf6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

/* ─── main component ─── */
const OrganizationDashboard = () => {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <OrgTopBar />
      <OrgStatCards />
      <AlertBanner />
      <BatchPerformanceCards />
      <PlacementSummary />
      <FacultyOverview />
      <EnrollmentTrendChart />
    </motion.div>
  );
};

export default OrganizationDashboard;