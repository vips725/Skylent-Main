import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  IndianRupee,
  TrendingUp,
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

/* ─── metric mini cards data ─── */
const metrics = [
  {
    label: "Placed",
    value: "3",
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "In Process",
    value: "4",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Avg Package",
    value: "₹7.9L",
    icon: IndianRupee,
    color: "bg-violet-100 text-violet-600",
  },
  {
    label: "Placement Rate",
    value: "56%",
    icon: TrendingUp,
    color: "bg-sky-100 text-sky-600",
  },
];

/* ─── pipeline table data ─── */
const pipelineRows = [
  {
    student: "Rahul Sharma",
    course: "Full Stack Dev",
    stage: "Placed",
    stageClass: "bg-emerald-100 text-emerald-700",
    company: "TCS",
    package: "₹7.2 LPA",
  },
  {
    student: "Priya Patel",
    course: "Full Stack Dev",
    stage: "Placed",
    stageClass: "bg-emerald-100 text-emerald-700",
    company: "Accenture",
    package: "₹8.5 LPA",
  },
  {
    student: "Sneha Gupta",
    course: "Full Stack Dev",
    stage: "Placed",
    stageClass: "bg-emerald-100 text-emerald-700",
    company: "Wipro",
    package: "₹6.8 LPA",
  },
  {
    student: "Ananya Nair",
    course: "Full Stack Dev",
    stage: "Offer Received",
    stageClass: "bg-stone-100 text-stone-700",
    company: "Deloitte",
    package: "₹9.0 LPA",
  },
  {
    student: "Meera Joshi",
    course: "Full Stack Dev",
    stage: "Interview",
    stageClass: "bg-amber-100 text-amber-700",
    company: "IBM",
    package: "—",
  },
  {
    student: "Amit Kumar",
    course: "Data Science",
    stage: "Interview",
    stageClass: "bg-amber-100 text-amber-700",
    company: "TCS",
    package: "—",
  },
  {
    student: "Vikram Singh",
    course: "Data Science",
    stage: "Profile Building",
    stageClass: "bg-stone-200 text-stone-600",
    company: "—",
    package: "—",
  },
  {
    student: "Rohan Desai",
    course: "Data Science",
    stage: "Not Started",
    stageClass: "bg-stone-100 text-stone-500",
    company: "—",
    package: "—",
  },
];

/* ─── Header ─── */
const PlacementsHeader = () => (
  <motion.div variants={itemVariants} className="space-y-1">
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Placement Tracking
        </h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Track your students through the placement pipeline
        </p>
      </div>
    </div>
  </motion.div>
);

/* ─── Metric Cards Row ─── */
const MetricCards = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-stone-50 to-neutral-100 border border-stone-200/60 p-5">
    <div className="absolute -top-6 -left-6 w-40 h-40 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-6 right-12 w-36 h-36 bg-violet-100/20 rounded-full blur-3xl pointer-events-none" />
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 relative"
    >
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          variants={itemVariants}
          whileHover={cardHover}
          className="p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-3 hover:shadow-xl hover:border-stone-200/80 transition-shadow"
        >
          <div className={`p-2.5 rounded-lg ${m.color}`}>
            <m.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              {m.label}
            </p>
            <p className="text-xl font-bold text-stone-800">
              {m.value}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

/* ─── Pipeline Table ─── */
const PipelineTable = () => (
  <motion.div
    variants={itemVariants}
    className="border border-stone-200/80 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="p-5 border-b border-stone-100">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-violet-400 rounded-full" />
        <h2 className="text-base font-semibold text-stone-700">Placement Pipeline</h2>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-stone-50/80 border-b border-stone-200">
            {["Student", "Course", "Stage", "Company", "Package"].map((h, i) => (
              <th
                key={h}
                className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pipelineRows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-stone-100 hover:bg-stone-50/80 hover:shadow-sm transition-all duration-200"
            >
              <td className="px-4 py-3.5">
                <span className="font-medium text-stone-800 whitespace-nowrap">
                  {row.student}
                </span>
              </td>
              <td className="px-4 py-3.5 text-stone-600">
                {row.course}
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${row.stageClass}`}
                >
                  {row.stage}
                </span>
              </td>
              <td className="px-4 py-3.5 text-stone-600">
                {row.company}
              </td>
              <td className="px-4 py-3.5 font-medium text-stone-700">
                {row.package}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

/* ─── main component ─── */
const OrganizationPlacements = () => {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <PlacementsHeader />
      <MetricCards />
      <PipelineTable />
    </motion.div>
  );
};

export default OrganizationPlacements;