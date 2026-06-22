import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Briefcase,
  TrendingUp,
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

/* ─── metric cards data ─── */
const metrics = [
  {
    label: "Active Students",
    value: "68",
    context: "out of 85 enrolled",
    icon: Users,
  },
  {
    label: "Avg Completion",
    value: "74%",
    context: "+6% vs last month",
    icon: Target,
  },
  {
    label: "Avg Quiz Score",
    value: "82%",
    context: "across all batches",
    icon: Award,
  },
  {
    label: "Placement Rate",
    value: "56%",
    context: "48 of 85 placed",
    icon: Briefcase,
  },
];

/* ─── completion by batch data ─── */
const completionBatches = [
  {
    label: "2025-A",
    sub: "Full Stack",
    value: 72,
  },
  {
    label: "2025-B",
    sub: "Data Science",
    value: 58,
  },
  {
    label: "2024-C",
    sub: "Cloud",
    value: 94,
  },
];

/* ─── weekly active students data ─── */
const weeklyData = [
  { name: "Mon", value: 52 },
  { name: "Tue", value: 58 },
  { name: "Wed", value: 61 },
  { name: "Thu", value: 55 },
  { name: "Fri", value: 64 },
  { name: "Sat", value: 70 },
  { name: "Sun", value: 62 },
];

/* ─── student status distribution data ─── */
const statusDistribution = [
  { label: "Active", count: 58, dotClass: "bg-emerald-500", badgeClass: "bg-emerald-100 text-emerald-700" },
  { label: "At Risk", count: 12, dotClass: "bg-amber-500", badgeClass: "bg-amber-100 text-amber-700" },
  { label: "Inactive", count: 7, dotClass: "bg-rose-500", badgeClass: "bg-rose-100 text-rose-700" },
  { label: "Completed", count: 8, dotClass: "bg-violet-500", badgeClass: "bg-violet-100 text-violet-700" },
];

/* ─── top performing students data ─── */
const topStudents = [
  { rank: 1, name: "Priya Patel", progress: 95, score: 94 },
  { rank: 2, name: "Ananya Nair", progress: 91, score: 92 },
  { rank: 3, name: "Sneha Gupta", progress: 88, score: 90 },
  { rank: 4, name: "Rahul Sharma", progress: 82, score: 88 },
  { rank: 5, name: "Meera Joshi", progress: 79, score: 85 },
];

/* ─── Header ─── */
const AnalyticsHeader = () => (
  <motion.div
    variants={itemVariants}
    className="pb-4 border-b border-stone-200"
  >
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800">Analytics</h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Performance metrics for your institution
        </p>
      </div>
    </div>
  </motion.div>
);

/* ─── Metric Cards Row ─── */
const MetricCards = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-stone-50 to-neutral-100 border border-stone-200/60 p-5">
    <div className="absolute -top-8 -left-4 w-56 h-56 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-8 right-8 w-40 h-40 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-4 relative"
    >
      {metrics.map((card) => (
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
              {card.context}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

/* ─── Completion by Batch ─── */
const CompletionByBatch = () => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-violet-400 rounded-full" />
      <h2 className="text-base font-semibold text-stone-700">Completion by Batch</h2>
    </div>
    <div className="space-y-5">
      {completionBatches.map((batch) => (
        <div key={batch.label}>
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="text-sm font-semibold text-stone-800">
                {batch.label}
              </span>
              <span className="ml-2 text-xs text-stone-400">
                {batch.sub}
              </span>
            </div>
            <span className="text-sm font-bold text-stone-700">
              {batch.value}%
            </span>
          </div>
          <div className="h-2.5 bg-stone-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500 shadow-sm shadow-violet-300/50"
              style={{ width: `${batch.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ─── Weekly Active Students Chart ─── */
const WeeklyActiveChart = () => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-sky-400 rounded-full" />
      <h2 className="text-base font-semibold text-stone-700 flex items-center gap-2">
        Weekly Active Students
        <TrendingUp className="w-4 h-4 text-stone-500" />
      </h2>
    </div>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
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

/* ─── Student Status Distribution ─── */
const StudentStatusDistribution = () => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-emerald-400 rounded-full" />
      <h2 className="text-base font-semibold text-stone-700">Student Status Distribution</h2>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {statusDistribution.map((status) => (
        <motion.div
          key={status.label}
          whileHover={cardHover}
          className="bg-white/60 border border-stone-200/80 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2.5 h-2.5 rounded-full ${status.dotClass}`} />
            <span className="text-sm font-medium text-stone-600">
              {status.label}
            </span>
          </div>
          <span className="text-2xl font-bold text-stone-800">
            {status.count}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ─── Top Performing Students ─── */
const TopPerformingStudents = () => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="p-5 border-b border-white/20">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-amber-400 rounded-full" />
        <h2 className="text-base font-semibold text-stone-700">Top Performing Students</h2>
      </div>
    </div>
    <div className="p-5 space-y-4">
      {topStudents.map((student) => (
        <div
          key={student.rank}
          className="flex items-center gap-4"
        >
          <span className="text-lg font-bold text-stone-400 w-6 text-center flex-shrink-0">
            {student.rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-stone-800 truncate">
                {student.name}
              </span>
              <span className={`ml-2 flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700`}>
                {student.score}%
              </span>
            </div>
            <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500 shadow-sm shadow-violet-300/50"
                style={{ width: `${student.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ─── main component ─── */
const OrganizationAnalytics = () => {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnalyticsHeader />
      <MetricCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CompletionByBatch />
        <WeeklyActiveChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StudentStatusDistribution />
        <TopPerformingStudents />
      </div>
    </motion.div>
  );
};

export default OrganizationAnalytics;