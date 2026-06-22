import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Layers, Users, Briefcase, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const OrganizationProfile = () => {
  const stats = [
    { label: 'Batches Managed', value: '3', icon: Layers, color: 'from-violet-500 to-indigo-600' },
    { label: 'Students Enrolled', value: '85', icon: Users, color: 'from-emerald-500 to-teal-600' },
    { label: 'Placements Facilitated', value: '48', icon: Briefcase, color: 'from-amber-500 to-orange-600' },
  ];

  const recentActivity = [
    { text: 'Approved student enrollment for Batch 2024-A', time: '2 hours ago' },
    { text: 'Updated faculty schedule for Web Dev course', time: '5 hours ago' },
    { text: 'Reviewed placement interview results', time: '1 day ago' },
    { text: 'Added new faculty member to the platform', time: '2 days ago' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Profile</h1>
        <p className="text-stone-500 text-sm mt-1">Your personal profile</p>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5"
      >
        <div className="flex items-center gap-4 mb-6 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 px-4 py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
            TA
          </div>
          <div>
            <h2 className="font-semibold text-stone-900 text-lg">Tech Academy Admin</h2>
            <div className="flex items-center gap-2 text-stone-500 text-sm mt-1">
              <Mail className="w-4 h-4" />
              <span>admin@techacademy.com</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500 text-sm mt-0.5">
              <Shield className="w-4 h-4" />
              <span>Organization Administrator</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 p-3 text-center hover:bg-white/60 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-xl font-bold text-stone-900">{stat.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-stone-900">Recent Activity</h2>
            <p className="text-xs text-stone-500">Your latest actions</p>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/30"
            >
              <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-700">{activity.text}</p>
                <p className="text-xs text-stone-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrganizationProfile;