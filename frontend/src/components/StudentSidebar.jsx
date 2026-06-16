import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiBookOpen,
  FiLogOut,
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const studentNav = [
  { Icon: FiHome, title: "Dashboard", path: "/student/dashboard" },
  { Icon: FiBookOpen, title: "My Courses", path: "/student/courses" },
];

const StudentSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-slate-100 dark:bg-stone-800 rounded-lg shadow pb-4 h-full">
      <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-auto scrollbar-none sticky top-4 p-4">
        {/* Account Toggle */}
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300 dark:border-stone-700">
          <button className="flex p-0.5 hover:bg-stone-200 dark:hover:bg-stone-700 rounded translate-colors relative gap-2 w-full items-center">
            <img src="/svg.png" alt="User" className="w-8 h-8 text-sm" />
            <div className="text-start mt-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-stone-100">{user?.username || user?.name || 'Student'}</span>
            </div>
            <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
            <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-2 py-1">
            OVERVIEW
          </h3>

          {studentNav.map((item) => (
            <RouteLink key={item.path} {...item} />
          ))}

          {/* SYSTEM SECTION */}
          <div className="mt-6 border-t border-stone-300 dark:border-stone-700 pt-3 space-y-1">
            <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-400 uppercase tracking-wider px-2 py-1">
              SYSTEM
            </h3>
            <button
              onClick={handleBackHome}
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 dark:hover:bg-stone-700 bg-transparent text-stone-900 dark:text-stone-300 shadow-none"
            >
              <FiArrowLeft />
              <span>Back to Home</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 dark:hover:bg-stone-700 bg-transparent text-stone-900 dark:text-stone-300 shadow-none"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RouteLink = ({ Icon, title, path }) => {
  return (
    <NavLink
      to={path}
      end={false}
      className={({ isActive }) =>
        `flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          isActive
            ? "bg-white dark:bg-stone-700 text-stone-950 dark:text-stone-100 shadow dark:shadow-none"
            : "hover:bg-stone-200 dark:hover:bg-stone-700 bg-transparent text-stone-900 dark:text-stone-300 shadow-none"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={isActive ? "text-violet-500" : "dark:text-stone-400"} />
          <span>{title}</span>
        </>
      )}
    </NavLink>
  );
};

export default StudentSidebar;