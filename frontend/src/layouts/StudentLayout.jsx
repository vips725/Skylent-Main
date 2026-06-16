import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";

const StudentLayoutInner = () => {
  const { isDark } = useDarkMode();

  return (
    <div className={`min-h-screen w-full bg-stone-50 dark:bg-stone-900 grid grid-cols-[220px_1fr] gap-4 p-4 transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="h-full sticky top-4">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className="min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

const StudentLayout = () => {
  return (
    <DarkModeProvider>
      <StudentLayoutInner />
    </DarkModeProvider>
  );
};

export default StudentLayout;