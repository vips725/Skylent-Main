import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext({
  isDark: false,
  toggleDark: () => {},
});

function getInitialDarkMode() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("student-dark-mode");
  if (stored !== null) {
    return stored === "true";
  }
  return false;
}

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialDarkMode);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("student-dark-mode", String(next));
      return next;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}