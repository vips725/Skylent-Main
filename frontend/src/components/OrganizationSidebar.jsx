import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  GraduationCap,
  Layers,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  ArrowLeft,
  User,
  UserCircle,
  Settings,
} from "lucide-react";
import { FiChevronDown, FiChevronUp, FiSearch, FiCommand } from "react-icons/fi";

const overviewNav = [
  { Icon: LayoutDashboard, title: "Dashboard", path: "/organization" },
  { Icon: BarChart3, title: "Analytics", path: "/organization/analytics" },
];

const managementNav = [
  { Icon: Users, title: "Students", path: "/organization/students" },
  { Icon: GraduationCap, title: "Faculty", path: "/organization/faculty" },
  { Icon: Layers, title: "Batches", path: "/organization/batches" },
];

const operationsNav = [
  { Icon: Briefcase, title: "Placements", path: "/organization/placements" },
  { Icon: FileText, title: "Reports", path: "/organization/reports" },
  { Icon: MessageSquare, title: "Contact Skylent", path: "/organization/contact" },
];

const accountNav = [
  { Icon: User, title: "Account", path: "/organization/account" },
  { Icon: UserCircle, title: "Profile", path: "/organization/profile" },
];

const OrganizationSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDark } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const handleClickOutside = (e) => {
    if (accountRef.current && !accountRef.current.contains(e.target)) {
      setAccountOpen(false);
    }
  };

  useEffect(() => {
    if (accountOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [accountOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackAdmin = () => {
    navigate("/admin/dashboard");
  };

  const handleNavClick = () => {
    setSearchQuery("");
  };

  // Filter nav items based on search query
  const filterItems = (items) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
    );
  };

  const filteredOverview = filterItems(overviewNav);
  const filteredManagement = filterItems(managementNav);
  const filteredOperations = filterItems(operationsNav);
  const filteredAccount = filterItems(accountNav);

  // Check if a group should be hidden when searching
  const isGroupEmpty = (group) => group.length === 0;

  return (
    <div className="bg-stone-100 rounded-lg shadow pb-4 h-full">
      <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-auto scrollbar-none sticky top-4 p-4">
        {/* Account Toggle */}
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300 dark:border-stone-700" ref={accountRef}>
          <div className="relative overflow-hidden rounded-lg dark:bg-white/5 dark:backdrop-blur-sm dark:border dark:border-white/10">
            {isDark && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -inset-[100%] animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12" />
              </div>
            )}
            <button
              onClick={() => setAccountOpen((prev) => !prev)}
              className="flex p-0.5 hover:bg-stone-200 dark:hover:bg-stone-700 rounded translate-colors relative gap-2 w-full items-center"
            >
              <img src="/svg.png" alt="User" className="w-8 h-8 text-sm" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold text-stone-800 dark:text-stone-100 truncate">Tech Academy</div>
                <span className="inline-flex mt-0.5 px-1.5 py-0.5 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-semibold rounded-full">
                  Partner
                </span>
              </div>
              <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs dark:text-stone-400" />
              <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs dark:text-stone-400" />
            </button>
          </div>

          {accountOpen && (
            <div className="relative overflow-hidden rounded-lg mt-2 dark:bg-white/5 dark:backdrop-blur-sm dark:border dark:border-white/10">
              {isDark && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -inset-[100%] animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12" />
                </div>
              )}
              <div className="px-4 py-3 border-b border-stone-200/60 dark:border-stone-700 flex items-center gap-3 relative">
                <img src="/svg.png" alt="User" className="w-10 h-10 text-sm" />
                <div>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">Tech Academy</p>
                  <span className="inline-flex mt-0.5 px-2 py-0.5 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-semibold rounded-full">
                    Partner
                  </span>
                </div>
              </div>
              <div className="p-2 relative">
                <button
                  onClick={() => { setAccountOpen(false); navigate('/organization/account'); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-stone-500" />
                  Account
                </button>
                <button
                  onClick={() => { setAccountOpen(false); navigate('/organization/profile'); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg transition-colors"
                >
                  <UserCircle className="w-4 h-4 text-stone-500" />
                  Profile
                </button>
                <button
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-stone-500" />
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>

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
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 py-1">
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
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 py-1 mt-4">
                MANAGEMENT
              </h3>
              {filteredManagement.map((item) => (
                <RouteLink key={item.path} {...item} onClick={handleNavClick} />
              ))}
            </>
          )}

          {/* OPERATIONS GROUP */}
          {!isGroupEmpty(filteredOperations) && (
            <>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 py-1 mt-4">
                OPERATIONS
              </h3>
              {filteredOperations.map((item) => (
                <RouteLink key={item.path} {...item} onClick={handleNavClick} />
              ))}
            </>
          )}

          {/* ACCOUNT GROUP */}
          {!isGroupEmpty(filteredAccount) && (
            <>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 py-1 mt-4">
                ACCOUNT
              </h3>
              {filteredAccount.map((item) => (
                <RouteLink key={item.path} {...item} onClick={handleNavClick} />
              ))}
            </>
          )}

          {/* SYSTEM SECTION */}
          <div className="mt-6 border-t border-stone-300 pt-3 space-y-1">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 py-1">
              SYSTEM
            </h3>
            <button
              onClick={handleBackAdmin}
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-900 shadow-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-900 shadow-none"
            >
              <LogOut className="w-4 h-4" />
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
      end={path === "/organization"}
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
          <Icon className={`w-4 h-4 ${isActive ? "text-violet-500" : "text-stone-400"}`} />
          <span>{title}</span>
        </>
      )}
    </NavLink>
  );
};

export default OrganizationSidebar;