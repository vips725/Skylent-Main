import React from "react";
import { FiUsers, FiDollarSign, FiClock } from "react-icons/fi";
import { Zap, BookOpen, Target } from "lucide-react";

export const StatCards = () => {
  return (
    <div className="space-y-4">
      {/* Light stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Total Users"
          value="14,832"
          change="+12.4%"
          subtitle="vs last month"
          icon={FiUsers}
          trend="up"
        />

        <Card
          title="Monthly Revenue"
          value="$35,400"
          change="+18.7%"
          subtitle="vs last month"
          icon={FiDollarSign}
          trend="up"
        />

        <Card
          title="Avg. Session Time"
          value="42 min"
          change="+5 min"
          subtitle="vs last month"
          icon={FiClock}
          trend="up"
        />
      </div>

      {/* Dark glassmorphism stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DarkCard
          title="Learning Streak"
          value="12 days"
          change="+3 days"
          subtitle="Keep it up!"
          icon={Zap}
          trend="up"
        />

        <DarkCard
          title="Course Status"
          value="8 Active"
          change="+2 new"
          subtitle="this week"
          icon={BookOpen}
          trend="up"
        />

        <DarkCard
          title="Completion Rate"
          value="76%"
          change="+4.2%"
          subtitle="vs last month"
          icon={Target}
          trend="up"
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, change, subtitle, icon: Icon, trend }) => {
  return (
    <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm hover:shadow-md transition">
      {/* Top row: icon + title */}
      <div className="flex items-center gap-2 text-stone-500">
        <div className="p-2 rounded-lg bg-stone-100">
          <Icon className="text-stone-600" />
        </div>
        <h3 className="text-sm">{title}</h3>
      </div>

      {/* Value */}
      <p className="text-2xl font-semibold mt-3">{value}</p>

      {/* Bottom row */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-stone-500">{subtitle}</span>
      </div>
    </div>
  );
};

const DarkCard = ({ title, value, change, subtitle, icon: Icon, trend }) => {
  return (
    <div className="p-5 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-lg">
      {/* Top row: icon + title */}
      <div className="flex items-center gap-2 text-gray-500">
        <div className="p-2 rounded-lg bg-violet-100">
          <Icon className="text-violet-600" size={16} />
        </div>
        <h3 className="text-sm">{title}</h3>
      </div>

      {/* Value */}
      <p className="text-2xl font-semibold mt-3 text-gray-900">{value}</p>

      {/* Bottom row */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
};