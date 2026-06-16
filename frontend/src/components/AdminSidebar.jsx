import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AccountToggleSidebar from "./AccountToggleSidebar";
import { Search } from "./Search.jsx";
import { useAuth } from "../context/AuthContext";

import {
  FiActivity,
  FiHome,
  FiFileText,
  FiBookOpen,
  FiUsers,
  FiBarChart2,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";

const adminNav = [
  { Icon: FiHome, title: "Dashboard", path: "/admin/dashboard" },
  { Icon: FiBarChart2, title: "Analytics", path: "/admin/analytics" },
  { Icon: FiUsers, title: "Users", path: "/admin/users" },
  { Icon: FiBookOpen, title: "Courses", path: "/admin/courses" },
  { Icon: FiFileText, title: "Reports", path: "/admin/reports" },
  { Icon: FiActivity, title: "Engagement", path: "/admin/engagement" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-slate-100 rounded-lg shadow pb-4 h-full">
      <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-scroll sticky top-4 p-4">
        <AccountToggleSidebar />
        <Search />

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 py-1">
            OVERVIEW
          </h3>

          {adminNav.slice(0, 2).map((item) => (
            <RouteLink key={item.path} {...item} />
          ))}

          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2 py-1 mt-4">
            MANAGEMENT
          </h3>

          {adminNav.slice(2, 4).map((item) => (
            <RouteLink key={item.path} {...item} />
          ))}

          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2 py-1 mt-4">
            LMS Reports
          </h3>

          {adminNav.slice(4).map((item) => (
            <RouteLink key={item.path} {...item} />
          ))}

          {/* SYSTEM SECTION */}
          <div className="mt-6 border-t border-stone-300 pt-3 space-y-1">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2 py-1">
              SYSTEM
            </h3>
            <button
              onClick={handleBackHome}
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-900 shadow-none"
            >
              <FiArrowLeft />
              <span>Back to Home</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-900 shadow-none"
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
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-900 shadow-none"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={isActive ? "text-violet-500" : ""} />
          <span>{title}</span>
        </>
      )}
    </NavLink>
  );
};

export default AdminSidebar;
