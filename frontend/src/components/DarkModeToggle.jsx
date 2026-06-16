import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle = () => {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-stone-600" />
      )}
    </button>
  );
};

export default DarkModeToggle;