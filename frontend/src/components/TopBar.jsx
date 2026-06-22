import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiBriefcase } from "react-icons/fi";

export const TopBar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block text-stone-900">Admin Dashboard</span>
          <span className="text-xs block text-stone-600">
            Platform overview and key metrics
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="flex text-sm text-stone-700 items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          >
            <FiGrid />
            <span>View Student APP</span>
          </button>

          <button
            onClick={() => navigate("/organization")}
            className="flex text-sm items-center gap-2 bg-amber-50/70 backdrop-blur-md border border-amber-200/50 shadow-sm hover:bg-amber-100/80 hover:text-amber-800 hover:shadow-md hover:border-amber-300/60 transition-all duration-300 text-stone-700 px-3 py-1.5 rounded"
          >
            <FiBriefcase className="group-hover:text-amber-600" />
            <span>View Organization</span>
          </button>
        </div>
      </div>
    </div>
  );
};