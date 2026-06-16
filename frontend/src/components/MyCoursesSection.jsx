import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

const courses = [
  {
    name: "Web Development",
    progress: 75,
    lessonsCompleted: 45,
    totalLessons: 60,
    gradient: "from-violet-200 to-blue-200",
    darkGradient: "dark:from-violet-900 dark:to-blue-900",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
  },
  {
    name: "Data Science",
    progress: 45,
    lessonsCompleted: 27,
    totalLessons: 60,
    gradient: "from-emerald-200 to-teal-200",
    darkGradient: "dark:from-emerald-900 dark:to-teal-900",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    name: "UI/UX Design",
    progress: 60,
    lessonsCompleted: 36,
    totalLessons: 60,
    gradient: "from-pink-200 to-rose-200",
    darkGradient: "dark:from-pink-900 dark:to-rose-900",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    name: "Cloud Computing",
    progress: 30,
    lessonsCompleted: 18,
    totalLessons: 60,
    gradient: "from-amber-200 to-orange-200",
    darkGradient: "dark:from-amber-900 dark:to-orange-900",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
];

const MyCoursesSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-500" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              My Courses
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">Your active learning journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md border border-white/40 dark:border-stone-700/40 shadow-lg rounded-xl p-5 hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient Banner */}
            <div
              className={`h-20 -mx-5 -mt-5 mb-4 rounded-t-xl bg-gradient-to-br ${course.gradient} ${course.darkGradient}`}
            />

            {/* Course Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                {course.name}
              </h4>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 dark:bg-violet-400 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {course.lessonsCompleted} / {course.totalLessons} lessons completed
                </p>
              </div>

              {/* Continue Button */}
              <button
                className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-1 rounded hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors duration-200"
                onClick={() => {}}
              >
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="flex justify-end">
        <Link
          to="/student/courses"
          className="flex items-center gap-1 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
        >
          View All Courses
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default MyCoursesSection;