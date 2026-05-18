import { useState, useEffect } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">

      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-md">

        <h2 className="text-xl font-semibold mb-4">Appearance</h2>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

      </div>

    </div>
  );
};

export default Settings;