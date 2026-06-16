import React, { useState } from "react";
import { FiBookOpen, FiArrowRight, FiFilter } from "react-icons/fi";
import { Award, Download, Eye } from "lucide-react";

const mockCourses = [
  {
    name: "Advanced React Patterns",
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
    color: "bg-violet-500",
    darkColor: "dark:bg-violet-400",
    gradient: "from-violet-300 to-indigo-300",
    darkGradient: "dark:from-violet-900 dark:to-indigo-900",
  },
  {
    name: "Node.js Backend Development",
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
    color: "bg-emerald-500",
    darkColor: "dark:bg-emerald-400",
    gradient: "from-emerald-300 to-teal-300",
    darkGradient: "dark:from-emerald-900 dark:to-teal-900",
  },
  {
    name: "TypeScript Fundamentals",
    progress: 90,
    lessonsCompleted: 18,
    totalLessons: 20,
    color: "bg-blue-500",
    darkColor: "dark:bg-blue-400",
    gradient: "from-blue-300 to-cyan-300",
    darkGradient: "dark:from-blue-900 dark:to-cyan-900",
  },
  {
    name: "GraphQL & Apollo",
    progress: 20,
    lessonsCompleted: 4,
    totalLessons: 20,
    color: "bg-rose-500",
    darkColor: "dark:bg-rose-400",
    gradient: "from-rose-300 to-pink-300",
    darkGradient: "dark:from-rose-900 dark:to-pink-900",
  },
];

const certificates = [
  {
    name: "React Basics Certificate",
    course: "Advanced React Patterns",
    date: "March 15, 2024",
    credentialId: "CERT-2024-001",
  },
  {
    name: "JavaScript Advanced Certificate",
    course: "JavaScript Mastery",
    date: "January 8, 2024",
    credentialId: "CERT-2024-002",
  },
  {
    name: "Web Development Bootcamp",
    course: "Full Stack Development",
    date: "December 20, 2023",
    credentialId: "CERT-2023-089",
  },
];

const tabs = ["All", "In Progress", "Completed", "Certificates"];

const StudentCoursesPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FiBookOpen className="w-5 h-5 text-violet-500" />
          <h1 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
            My Courses
          </h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 ml-7">Manage your enrolled courses</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <FiFilter className="w-4 h-4 text-stone-400 dark:text-stone-500" />
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 shadow-sm"
                : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md border border-white/40 dark:border-stone-700/40 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Gradient Banner */}
            <div className={`h-24 bg-gradient-to-br ${course.gradient} ${course.darkGradient}`} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-4 -mt-10">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm shadow-md flex items-center justify-center">
                    <FiBookOpen className="text-violet-500 w-5 h-5" />
                  </div>
                  <div className="pt-8">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {course.name}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                      {course.lessonsCompleted}/{course.totalLessons} lessons completed
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                    Progress
                  </span>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${course.color} ${course.darkColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex gap-2">
                <button className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-3 py-1.5 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors duration-200 font-medium">
                  Continue Learning
                </button>
                <button className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-3 py-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors duration-200 font-medium">
                  Overview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-emerald-500" />
          <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            Certificates Earned
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md border border-white/40 dark:border-stone-700/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{cert.course}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Issued:</span>
                  <span className="text-stone-700 dark:text-stone-300 font-medium">
                    {cert.date}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Credential:</span>
                  <span className="text-stone-700 dark:text-stone-300 font-mono text-[10px]">
                    {cert.credentialId}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors duration-200 font-medium">
                  <Eye className="w-3 h-3" />
                  View
                </button>
                <button className="flex items-center gap-1 text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-3 py-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors duration-200 font-medium">
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCoursesPage;