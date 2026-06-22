import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AccountToggleSidebar from "./AccountToggleSidebar";
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
  FiBriefcase,
  FiSearch,
  FiCommand,
} from "react-icons/fi";

const adminNav = [
  { Icon: FiHome, title: "Dashboard", path: "/admin/dashboard" },
  { Icon: FiBarChart2, title: "Analytics", path: "/admin/analytics" },
  { Icon: FiUsers, title: "Users", path: "/admin/users" },
  { Icon: FiBookOpen, title: "Courses", path: "/admin/courses" },
];

const lmsReportsNav = [
  { Icon: FiFileText, title: "Reports", path: "/admin/reports" },
  { Icon: FiActivity, title: "Engagement", path: "/admin/engagement" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleNavClick = () => {
    setSearchQuery("");
  };

  const filterItems = (items) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
    );
  };

  const filteredOverview = filterItems(adminNav.slice(0, 2));
  const filteredManagement = filterItems(adminNav.slice(2, 4));
  const filteredLmsReports = filterItems(lmsReportsNav);

  const isGroupEmpty = (group) => group.length === 0;

  return (
    <div className="bg-slate-100 rounded-lg shadow pb-4 h-full">
      <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-scroll sticky top-4 p-4">
        <AccountToggleSidebar />

        {/* Search Input */}
        <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
          <FiSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-stone-900 placeholder-stone-500 text-sm"
          />
          <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
            <FiCommand />K
          </span>
        </div>

        <div className="space-y-1">
          {/* OVERVIEW GROUP */}
          {!isGroupEmpty(filteredOverview) && (
            <>
              <h3 className="text-xs font-semibold text-stone-600 uppercase tracking-wider px-2 py-1">
                OVERVIEW
              </h3>
              {filteredOverview.map((item) => (
                <RouteLink key={item.path} {...item} onClick={handleNavClick} />
              ))}
            </>
          )}

          {/* MANAGEMENT GROUP */}
          {!isGroupEmpty(filteredManagement) && (
            <>
              <h3 className="text-xs font-semibold text-stone-600 uppercase tracking-wider px-2 py-1 mt-4">
                MANAGEMENT
              </h3>
              {filteredManagement.map((item) => (
                <RouteLink key={item.path} {...item} onClick={handleNavClick} />
              ))}
            </>
          )}

          {/* LMS Reports GROUP */}
          {!isGroupEmpty(filteredLmsReports) && (
            <>
              <h3 className="text-xs font-semibold text-stone-600 uppercase tracking-wider px-2 py-1 mt-4">
                LMS Reports
              </h3>
              {filteredLmsReports.map((item) => (
                <RouteLink key={item.path} {...item} onClick={handleNavClick} />
              ))}
            </>
          )}

          {/* SYSTEM SECTION */}
          <div className="mt-6 border-t border-stone-300 pt-3 space-y-1">
            <h3 className="text-xs font-semibold text-stone-600 uppercase tracking-wider px-2 py-1">
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

const RouteLink = ({ Icon, title, path, onClick }) => {
  return (
    <NavLink
      to={path}
      end={false}
      onClick={onClick}
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
