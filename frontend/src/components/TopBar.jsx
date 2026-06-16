import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid } from "react-icons/fi";

export const TopBar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀Admin Dashboard</span>
          <span className="text-xs block text-stone-500">
            Platform overview and key metrics
          </span>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
        >
          <FiGrid />
          <span>View Student APP</span>
        </button>
      </div>
    </div>
  );
};