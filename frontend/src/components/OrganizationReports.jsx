import React from "react";
import { motion } from "framer-motion";
import { Wrench, FileText } from "lucide-react";

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

/* ─── Header ─── */
const ReportsHeader = () => (
  <motion.div variants={itemVariants} className="space-y-1">
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Reports
        </h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Generate and download institutional reports
        </p>
      </div>
    </div>
  </motion.div>
);

/* ─── Placeholder Card ─── */
const PlaceholderCard = () => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-center min-h-[60vh]"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl p-16 text-center max-w-md w-full hover:shadow-xl transition-shadow"
    >
      {/* Decorative orbs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-amber-100 mb-6 shadow-inner">
        <Wrench className="w-8 h-8 text-violet-600" />
      </div>

      <div className="relative">
        <h2 className="text-xl font-bold text-stone-800 mb-2">
          Reports Coming Soon
        </h2>
        <p className="text-sm text-stone-500">
          Bringing those features soon
        </p>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── main component ─── */
const OrganizationReports = () => {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <ReportsHeader />
      <PlaceholderCard />
    </motion.div>
  );
};

export default OrganizationReports;