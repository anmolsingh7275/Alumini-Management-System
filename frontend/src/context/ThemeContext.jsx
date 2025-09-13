import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const defaultTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);
