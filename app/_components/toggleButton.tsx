"use client";

import { useState, useEffect } from "react";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <MdToggleOn size={36} color="var(--text-color)" />
      ) : (
        <MdToggleOff size={36} color="var(--text-color)" />
      )}
    </button>
  );
}
