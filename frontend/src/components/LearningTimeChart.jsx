import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const LearningTimeChart = () => {
  const [percentage, setPercentage] = useState(0);
  const targetPercentage = 70; // 4.2h out of 6h goal
  const currentTime = "4.2h";
  const goalTime = "6h";

  const circumference = 2 * Math.PI * 50; // r = 50
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700 shadow-sm p-5 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-violet-500" />
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          Today's Learning
        </h3>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">You're making great progress today!</p>

      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-40 h-40 -rotate-90">
          {/* Track circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            className="text-stone-200 dark:text-stone-700"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            className="text-violet-500 dark:text-violet-400 transition-all duration-1000 ease-out"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {currentTime}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">of {goalTime} goal</span>
        </div>
      </div>
    </div>
  );
};

export default LearningTimeChart;