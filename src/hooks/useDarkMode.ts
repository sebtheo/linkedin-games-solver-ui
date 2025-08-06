import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }

    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Update the document class and background colors when dark mode changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#0f172a"; // slate-900
      document.body.style.backgroundColor = "#0f172a";
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#0f172a");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
      document.body.style.backgroundColor = "#ffffff";
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#ffffff");
    }

    // Save the preference
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
};
