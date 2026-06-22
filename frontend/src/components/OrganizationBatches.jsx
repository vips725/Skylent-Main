import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Users,
  TrendingUp,
  Download,
  UserPlus,
  Eye,
  Calendar,
  Briefcase,
} from "lucide-react";

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

/* ─── data ─── */
const batches = [
  {
    id: "2025-A",
    name: "Batch 2025-A",
    badge: "Active",
    badgeColor: "bg-emerald-100 text-emerald-700",
    course: "Full Stack Web Development",
    started: "Jan 2025",
    progress: 72,
    students: 32,
    placed: 18,
    placementRate: 56,
  },
  {
    id: "2025-B",
    name: "Batch 2025-B",
    badge: "Active",
    badgeColor: "bg-emerald-100 text-emerald-700",
    course: "Data Science & ML",
    started: "Mar 2025",
    progress: 58,
    students: 28,
    placed: 8,
    placementRate: 29,
  },
  {
    id: "2024-C",
    name: "Batch 2024-C",
    badge: "Completed",
    badgeColor: "bg-violet-100 text-violet-700",
    course: "Cloud & DevOps",
    started: "Jun 2024",
    progress: 94,
    students: 25,
    placed: 22,
    placementRate: 88,
  },
];

/* ─── sub-components ─── */
const PageHeader = () => (
  <motion.div variants={itemVariants} className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Batches
        </h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Create and manage student batches
        </p>
      </div>
    </div>
    <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors">
      <Layers className="w-4 h-4" />
      Create Batch
    </button>
  </motion.div>
);

const BatchCard = ({ batch }) => (
  <motion.div
    variants={itemVariants}
    whileHover={cardHover}
    className="p-5 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl transition-shadow"
  >
    {/* Header row */}
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="text-lg font-bold text-stone-800 leading-tight">
          {batch.name}
        </h3>
        <span className={`inline-flex items-center mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${batch.badgeColor}`}>
          {batch.badge}
        </span>
      </div>
    </div>

    {/* Course name */}
    <p className="text-base font-semibold text-stone-700 mb-1">
      {batch.course}
    </p>

    {/* Started date */}
    <div className="flex items-center gap-1.5 mb-4 text-sm text-stone-500">
      <Calendar className="w-3.5 h-3.5" />
      <span>Started: {batch.started}</span>
    </div>

    {/* Progress bar */}
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
          Progress
        </span>
        <span className="text-sm font-bold text-stone-800">
          {batch.progress}%
        </span>
      </div>
      <div className="h-3 bg-stone-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500 shadow-sm shadow-violet-300/50"
          style={{ width: `${batch.progress}%` }}
        />
      </div>
    </div>

    {/* Stats row */}
    <div className="flex items-center justify-between bg-stone-100 rounded-xl p-3 mb-4">
      <div className="flex items-center gap-1.5 text-stone-700 text-sm">
        <Users className="w-4 h-4 text-violet-500" />
        <span className="font-semibold">{batch.students}</span>
        <span className="text-stone-500 text-xs">students</span>
      </div>
      <div className="h-4 w-px bg-stone-300" />
      <div className="flex items-center gap-1.5 text-stone-700 text-sm">
        <Briefcase className="w-4 h-4 text-emerald-500" />
        <span className="font-semibold">{batch.placed}</span>
        <span className="text-stone-500 text-xs">placed</span>
      </div>
      <div className="h-4 w-px bg-stone-300" />
      <div className="flex items-center gap-1.5 text-stone-700 text-sm">
        <TrendingUp className="w-4 h-4 text-amber-500" />
        <span className="font-semibold">{batch.placementRate}%</span>
        <span className="text-stone-500 text-xs">rate</span>
      </div>
    </div>

    {/* Action buttons */}
    <div className="flex items-center gap-2 flex-wrap">
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors">
        <Eye className="w-3.5 h-3.5" />
        View Students
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors">
        <UserPlus className="w-3.5 h-3.5" />
        + Add Students
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors">
        <Download className="w-3.5 h-3.5" />
        Report
      </button>
    </div>
  </motion.div>
);

const BatchesGrid = () => (
  <motion.div
    variants={containerVariants}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    {batches.map((batch) => (
      <BatchCard key={batch.id} batch={batch} />
    ))}
  </motion.div>
);

/* ─── main component ─── */
const OrganizationBatches = () => {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <PageHeader />
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-stone-50 to-neutral-100 border border-stone-200/60 p-5">
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-0 w-40 h-40 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />
        <BatchesGrid />
      </div>
    </motion.div>
  );
};

export default OrganizationBatches;