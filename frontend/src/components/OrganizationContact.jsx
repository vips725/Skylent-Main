import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Send, MessageSquare, Bell } from "lucide-react";

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

/* ─── subjects ─── */
const subjects = [
  "General Inquiry",
  "Technical Support",
  "Billing",
  "Partnership",
  "Feedback",
];

/* ─── Header ─── */
const ContactHeader = () => (
  <motion.div variants={itemVariants} className="space-y-1">
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full" />
      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Contact Skylent
        </h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Reach out to your Skylent Global partnership manager
        </p>
      </div>
    </div>
  </motion.div>
);

/* ─── Send a Message Form Card ─── */
const MessageFormCard = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subject: ${subject}\nMessage: ${message}`);
    setSubject("");
    setMessage("");
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={cardHover}
      className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-violet-400 rounded-full" />
        <h2 className="text-base font-semibold text-stone-700">Send a Message</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-600">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 cursor-pointer"
          >
            <option value="" disabled>
              Select a topic…
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-600">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your request or concern…"
            rows={5}
            required
            className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-none placeholder-stone-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          Send Message <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};

/* ─── Partnership Manager Card ─── */
const ManagerCard = () => (
  <motion.div
    variants={itemVariants}
    whileHover={cardHover}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-emerald-400 rounded-full" />
      <h3 className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
        Your Partnership Manager
      </h3>
    </div>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-stone-100 text-stone-700 flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 border-white shadow">
        SK
      </div>
      <div>
        <p className="text-sm font-bold text-stone-800">
          Saurabh Kumar
        </p>
        <p className="text-xs text-stone-500">
          Partnership Manager
        </p>
        <p className="text-xs text-stone-400 mt-0.5">
          saurabh@skylentglobal.com
        </p>
      </div>
    </div>
    <a
      href="mailto:saurabh@skylentglobal.com"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
    >
      Send Email <Send className="w-3.5 h-3.5" />
    </a>
  </motion.div>
);

/* ─── Quick Contact Card ─── */
const QuickContactCard = () => (
  <motion.div
    variants={itemVariants}
    whileHover={cardHover}
    className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-sky-400 rounded-full" />
      <h3 className="text-sm font-semibold text-stone-600 uppercase tracking-wide">
        Quick Contact
      </h3>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-violet-100 rounded-lg flex-shrink-0">
          <Mail className="w-4 h-4 text-violet-600" />
        </div>
        <span className="text-sm text-stone-700">
          partners@skylentglobal.com
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
          <Phone className="w-4 h-4 text-emerald-600" />
        </div>
        <span className="text-sm text-stone-700">
          +91 98765 43210
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
          <Clock className="w-4 h-4 text-amber-600" />
        </div>
        <span className="text-sm text-stone-700">
          Mon–Fri, 9:00 AM – 6:00 PM IST
        </span>
      </div>
    </div>
  </motion.div>
);

/* ─── Urgent Note Card ─── */
const UrgentNoteCard = () => (
  <motion.div
    variants={itemVariants}
    className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow"
  >
    <Bell className="w-5 h-5 text-amber-600 flex-shrink-0" />
    <p className="text-sm text-amber-800 leading-relaxed">
      For urgent issues (platform down, student access blocked), call the
      emergency line.
    </p>
  </motion.div>
);

/* ─── main component ─── */
const OrganizationContact = () => {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <ContactHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <MessageFormCard />

        {/* Right: Info cards */}
        <div className="space-y-4">
          <ManagerCard />
          <QuickContactCard />
          <UrgentNoteCard />
        </div>
      </div>
    </motion.div>
  );
};

export default OrganizationContact;