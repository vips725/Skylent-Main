import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  ChevronDown,
  CheckCircle2,
  Minus,
  Users,
  X,
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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

/* ─── data ─── */
const students = [
  {
    name: "Rahul Sharma",
    email: "rahul@abc.com",
    batch: "2025-A",
    course: "Full Stack Dev",
    progress: 82,
    attendance: 94,
    status: "Active",
    placed: false,
  },
  {
    name: "Priya Patel",
    email: "priya@abc.com",
    batch: "2025-A",
    course: "Full Stack Dev",
    progress: 95,
    attendance: 98,
    status: "Active",
    placed: true,
  },
  {
    name: "Amit Kumar",
    email: "amit@abc.com",
    batch: "2025-B",
    course: "Data Science",
    progress: 61,
    attendance: 76,
    status: "At Risk",
    placed: false,
  },
  {
    name: "Sneha Gupta",
    email: "sneha@abc.com",
    batch: "2025-A",
    course: "Full Stack Dev",
    progress: 88,
    attendance: 92,
    status: "Active",
    placed: true,
  },
  {
    name: "Vikram Singh",
    email: "vikram@abc.com",
    batch: "2025-B",
    course: "Data Science",
    progress: 42,
    attendance: 68,
    status: "At Risk",
    placed: false,
  },
  {
    name: "Ananya Nair",
    email: "ananya@abc.com",
    batch: "2025-A",
    course: "Full Stack Dev",
    progress: 91,
    attendance: 96,
    status: "Active",
    placed: true,
  },
  {
    name: "Rohan Desai",
    email: "rohan@abc.com",
    batch: "2025-B",
    course: "Data Science",
    progress: 35,
    attendance: 60,
    status: "Inactive",
    placed: false,
  },
  {
    name: "Meera Joshi",
    email: "meera@abc.com",
    batch: "2025-A",
    course: "Full Stack Dev",
    progress: 79,
    attendance: 88,
    status: "Active",
    placed: false,
  },
];

/* ─── helpers ─── */
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

const statusBadge = (status) => {
  if (status === "Active")
    return "bg-emerald-100 text-emerald-700";
  if (status === "At Risk")
    return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
};

const progressColor = (value) => {
  if (value >= 80) return "bg-gradient-to-r from-violet-400 to-violet-600 shadow-sm shadow-violet-300/50";
  if (value >= 60) return "bg-gradient-to-r from-violet-400 to-violet-600 shadow-sm shadow-violet-300/50";
  if (value >= 40) return "bg-gradient-to-r from-amber-400 to-amber-600 shadow-sm shadow-amber-300/50";
  return "bg-gradient-to-r from-rose-400 to-rose-600 shadow-sm shadow-rose-300/50";
};

/* ─── Enroll Student Modal ─── */
const EnrollStudentModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    batch: "",
    course: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enrolling student:", form);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full" />
                <div>
                  <h2 className="text-lg font-bold text-stone-800">Enroll New Student</h2>
                  <p className="text-sm text-stone-500 mt-0.5">Add a student to your organization</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Student full name"
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 placeholder-stone-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Email (will be used for login)</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="orgadmin@techacademy.com"
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 placeholder-stone-400"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Password (initial login password)</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 placeholder-stone-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 placeholder-stone-400"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
                />
              </div>

              {/* Batch */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Batch</label>
                <select
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer"
                >
                  <option value="">Select batch</option>
                  <option value="2025-A">2025-A</option>
                  <option value="2025-B">2025-B</option>
                  <option value="2024-C">2024-C</option>
                </select>
              </div>

              {/* Course */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Course</label>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer"
                >
                  <option value="">Select course</option>
                  <option value="Full Stack Dev">Full Stack Dev</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                </select>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── sub-components ─── */
const PageHeader = ({ onOpen }) => (
  <motion.div variants={itemVariants} className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Students
        </h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Manage and monitor your institution&apos;s students
        </p>
      </div>
    </div>
    <button
      onClick={onOpen}
      className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
    >
      <UserPlus className="w-4 h-4" />
      Enroll Student
    </button>
  </motion.div>
);

const SearchFiltersBar = () => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow"
  >
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
        />
      </div>

      {/* Batch Filter */}
      <div className="relative">
        <select className="appearance-none pl-3 pr-8 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer">
          <option>All Batches</option>
          <option>2025-A</option>
          <option>2025-B</option>
          <option>2024-C</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select className="appearance-none pl-3 pr-8 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer">
          <option>All Status</option>
          <option>Active</option>
          <option>At Risk</option>
          <option>Inactive</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
      </div>

      {/* Count */}
      <span className="ml-auto text-sm text-stone-500 font-medium whitespace-nowrap">
        8 students
      </span>
    </div>
  </motion.div>
);

const StudentsTable = () => (
  <motion.div
    variants={itemVariants}
    className="border border-stone-200/80 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
  >
    {/* Section label */}
    <div className="px-5 pt-4 pb-2 border-b border-stone-100">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-violet-400 rounded-full" />
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide">All Students</h2>
        <div className="flex-1 h-px bg-stone-200/60" />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-stone-50/80 border-b border-stone-200">
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Student
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Batch
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Course
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Progress
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Attendance
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Status
            </th>
            <th className="text-left px-4 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">
              Placed
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <motion.tr
              key={student.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="border-b border-stone-100 hover:bg-stone-50/80 hover:shadow-sm transition-all duration-200"
            >
              {/* Student cell */}
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {getInitials(student.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-800">
                      {student.name}
                    </p>
                    <p className="text-xs text-stone-500 truncate max-w-[160px]">
                      {student.email}
                    </p>
                  </div>
                </div>
              </td>

              {/* Batch */}
              <td className="px-4 py-3.5">
                <span className="inline-block px-2.5 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-full">
                  {student.batch}
                </span>
              </td>

              {/* Course */}
              <td className="px-4 py-3.5 text-stone-700 whitespace-nowrap">
                {student.course}
              </td>

              {/* Progress */}
              <td className="px-4 py-3.5 min-w-[120px]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full ${progressColor(student.progress)} rounded-full transition-all duration-500`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-stone-600 w-8 text-right">
                    {student.progress}%
                  </span>
                </div>
              </td>

              {/* Attendance */}
              <td className="px-4 py-3.5">
                <span className="font-semibold text-stone-800">
                  {student.attendance}%
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-3.5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadge(student.status)}`}>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      student.status === "Active"
                        ? "bg-emerald-500"
                        : student.status === "At Risk"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                  />
                  {student.status}
                </span>
              </td>

              {/* Placed */}
              <td className="px-4 py-3.5">
                {student.placed ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-stone-400 text-xs">
                    <Minus className="w-3.5 h-3.5" />
                  </span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

/* ─── main component ─── */
const OrganizationStudents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <PageHeader onOpen={() => setIsModalOpen(true)} />
        <SearchFiltersBar />
        <StudentsTable />
      </motion.div>
      <EnrollStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default OrganizationStudents;