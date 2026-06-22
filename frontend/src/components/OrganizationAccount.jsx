import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Key, CreditCard, Users } from 'lucide-react';

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

const OrganizationAccount = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Account</h1>
        <p className="text-stone-500 text-sm mt-1">Organization account settings</p>
      </motion.div>

      {/* Organization Info Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-stone-900">Organization Information</h2>
            <p className="text-xs text-stone-500">Your partner details</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/60 transition-colors">
            <Building2 className="w-4 h-4 text-stone-400" />
            <div className="flex-1">
              <p className="text-xs text-stone-600">Org Name</p>
              <p className="text-sm font-medium text-stone-900">Tech Academy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/60 transition-colors">
            <Key className="w-4 h-4 text-stone-400" />
            <div className="flex-1">
              <p className="text-xs text-stone-600">Partner ID</p>
              <p className="text-sm font-medium text-stone-900">SKL-PARTNER-2025</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/60 transition-colors">
            <Users className="w-4 h-4 text-stone-400" />
            <div className="flex-1">
              <p className="text-xs text-stone-600">Plan</p>
              <p className="text-sm font-medium text-stone-900">Active Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/60 transition-colors">
            <Mail className="w-4 h-4 text-stone-400" />
            <div className="flex-1">
              <p className="text-xs text-stone-600">Email</p>
              <p className="text-sm font-medium text-stone-900">partnerships@techacademy.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/60 transition-colors">
            <Phone className="w-4 h-4 text-stone-400" />
            <div className="flex-1">
              <p className="text-xs text-stone-600">Phone</p>
              <p className="text-sm font-medium text-stone-900">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/60 transition-colors">
            <MapPin className="w-4 h-4 text-stone-400" />
            <div className="flex-1">
              <p className="text-xs text-stone-600">Address</p>
              <p className="text-sm font-medium text-stone-900">Bangalore, India</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* API Access Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-stone-900">API Access</h2>
            <p className="text-xs text-stone-500">Manage API keys and integrations</p>
          </div>
        </div>

        <div className="py-8 text-center text-stone-500 text-sm bg-white/40 backdrop-blur-sm rounded-lg border border-white/30 px-4">
          API access management coming soon. Contact your partnership manager for API credentials.
        </div>
      </motion.div>

      {/* Billing Info Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-stone-900">Billing Info</h2>
            <p className="text-xs text-stone-500">Subscription and payment details</p>
          </div>
        </div>

        <div className="py-8 text-center text-stone-500 text-sm bg-white/40 backdrop-blur-sm rounded-lg border border-white/30 px-4">
          Billing management coming soon. Contact your partnership manager for billing inquiries.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrganizationAccount;