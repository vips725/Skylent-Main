import DarkModeToggle from "./DarkModeToggle";
import NotificationDropdown from "./NotificationDropdown";
import { useAuth } from "../context/AuthContext";

const StudentTopBar = () => {
  const { user } = useAuth();
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200 dark:border-stone-700">
      <div className="flex items-center justify-between">
        {/* Left side: title */}
        <div>
          <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">
            Student Dashboard
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Track your learning progress
          </p>
        </div>

        {/* Right side: student name, dark mode, notifications */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700">
            {user?.username || user?.name || 'Student'}
          </span>
          <DarkModeToggle />
          <NotificationDropdown />
        </div>
      </div>
    </div>
  );
};

export default StudentTopBar;