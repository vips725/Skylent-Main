import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  ChevronDown,
  Star,
  BookOpen,
  Layers,
  ArrowRight,
  GraduationCap,
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
const faculty = [
  {
    initials: "PAM",
    name: "Prof. Arjun Mehta",
    role: "Lead Instructor",
    status: "Active",
    department: "Technology",
    sessions: 48,
    rating: 4.8,
    batches: 2,
    batchLabel: "Full Stack Dev",
  },
  {
    initials: "DSP",
    name: "Dr. Sanjay Patel",
    role: "Course Mentor",
    status: "Active",
    department: "Data Science",
    sessions: 36,
    rating: 4.9,
    batches: 1,
    batchLabel: "Data Science & ML",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Lead Instructor",
    status: "Active",
    department: "Technology",
    sessions: 52,
    rating: 4.7,
    batches: 1,
    batchLabel: "Full Stack Dev",
  },
  {
    initials: "AV",
    name: "Amit Verma",
    role: "Project Guide",
    status: "On Leave",
    department: "Marketing",
    sessions: 30,
    rating: 4.6,
    batches: 1,
    batchLabel: "Digital Marketing",
  },
  {
    initials: "VS",
    name: "Vikram Singh",
    role: "Lab Instructor",
    status: "Active",
    department: "Technology",
    sessions: 22,
    rating: 4.7,
    batches: 1,
    batchLabel: "Cloud & DevOps",
  },
  {
    initials: "AP",
    name: "Ananya Patel",
    role: "Course Mentor",
    status: "Active",
    department: "Design",
    sessions: 18,
    rating: 4.8,
    batches: 1,
    batchLabel: "UI/UX Design",
  },
];

/* ─── helpers ─── */
const statusDot = (status) => {
  if (status === "Active") return "bg-emerald-500";
  if (status === "On Leave") return "bg-amber-500";
  return "bg-rose-500";
};

/* ─── Add Faculty Modal ─── */
const AddFacultyModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding faculty:", form);
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
                  <h2 className="text-lg font-bold text-stone-800">Add Faculty Member</h2>
                  <p className="text-sm text-stone-500 mt-0.5">Add an instructor or mentor to your organization</p>
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
                  placeholder="Prof. Name"
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 placeholder-stone-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Email</label>
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
                <label className="text-sm font-medium text-stone-600">Password</label>
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

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer"
                >
                  <option value="">Select role</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Course Mentor">Course Mentor</option>
                  <option value="Project Guide">Project Guide</option>
                  <option value="Lab Instructor">Lab Instructor</option>
                </select>
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-600">Department</label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer"
                >
                  <option value="">Select department</option>
                  <option value="Technology">Technology</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
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
                  Add Faculty
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
  <motion.div variants={itemVariants} className="space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
        <div>
          <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Faculty
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Instructors and mentors for your programs
          </p>
        </div>
      </div>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        Add Faculty
      </button>
    </div>

    {/* Stat Pills */}
    <div className="flex flex-wrap items-center gap-2 ml-4">
      {[
        { label: "6 Total Faculty", bg: "bg-stone-100 text-stone-700" },
        { label: "206 Sessions Conducted", bg: "bg-stone-100 text-stone-700" },
        { label: "4.75 Avg Rating", bg: "bg-stone-100 text-stone-700" },
        { label: "5 Active", bg: "bg-emerald-100 text-emerald-700" },
      ].map((pill) => (
        <span
          key={pill.label}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${pill.bg}`}
        >
          {pill.label}
        </span>
      ))}
    </div>
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
          placeholder="Search faculty..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
        />
      </div>

      {/* Department Filter */}
      <div className="relative">
        <select className="appearance-none pl-3 pr-8 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer">
          <option>All Departments</option>
          <option>Technology</option>
          <option>Data Science</option>
          <option>Marketing</option>
          <option>Design</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select className="appearance-none pl-3 pr-8 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer">
          <option>All Status</option>
          <option>Active</option>
          <option>On Leave</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
      </div>

      <span className="ml-auto text-sm text-stone-500 font-medium whitespace-nowrap">
        6 faculty members
      </span>
    </div>
  </motion.div>
);

const FacultyCard = ({ member }) => (
  <motion.div
    variants={itemVariants}
    whileHover={cardHover}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
  >
    {/* Avatar + Name + Role */}
    <div className="flex items-start gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-stone-100 text-stone-700 flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 border-white shadow">
        {member.initials}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-stone-800 text-base leading-tight">
          {member.name}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="inline-block px-2 py-0.5 bg-stone-100 text-stone-700 text-xs font-semibold rounded-full">
            {member.role}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-stone-500">
            <span className={`w-2 h-2 rounded-full ${statusDot(member.status)}`} />
            {member.status}
          </span>
        </div>
      </div>
    </div>

    {/* Department */}
    <div className="mb-4">
      <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
        {member.department}
      </span>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="bg-stone-100 rounded-lg p-2.5 text-center hover:bg-stone-200 transition-colors">
        <BookOpen className="w-4 h-4 text-violet-500 mx-auto mb-1" />
        <p className="text-sm font-bold text-stone-800">
          {member.sessions}
        </p>
        <p className="text-[10px] text-stone-500 leading-tight">
          Sessions
        </p>
      </div>
      <div className="bg-stone-100 rounded-lg p-2.5 text-center hover:bg-stone-200 transition-colors">
        <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
        <p className="text-sm font-bold text-stone-800">
          ★ {member.rating}
        </p>
        <p className="text-[10px] text-stone-500 leading-tight">
          Rating
        </p>
      </div>
      <div className="bg-stone-100 rounded-lg p-2.5 text-center hover:bg-stone-200 transition-colors">
        <Layers className="w-4 h-4 text-violet-500 mx-auto mb-1" />
        <p className="text-sm font-bold text-stone-800">
          {member.batches}
        </p>
        <p className="text-[10px] text-stone-500 leading-tight">
          Batches
        </p>
      </div>
    </div>

    {/* Batch chip */}
    <div className="mb-4">
      <span className="inline-block px-2.5 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-full">
        {member.batchLabel}
      </span>
    </div>

    {/* Footer link */}
    <button className="flex items-center gap-1 text-sm text-violet-600 font-semibold hover:text-violet-700 transition-colors">
      View Profile
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </motion.div>
);

const FacultyGrid = () => (
  <motion.div
    variants={containerVariants}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    {faculty.map((member) => (
      <FacultyCard key={member.initials} member={member} />
    ))}
  </motion.div>
);

/* ─── main component ─── */
const OrganizationFaculty = () => {
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
        <FacultyGrid />
      </motion.div>
      <AddFacultyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default OrganizationFaculty;