import { createContext, useContext, useEffect, useState } from "react";

// Initial context with theme and setter
const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
}) {
  const [theme, setThemeState] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    // If no stored theme, default to dark
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    // Only support light and dark themes
    root.classList.add(theme === "light" ? "light" : "dark");
  }, [theme]);

  const setTheme = (value) => {
    // Only allow light or dark themes
    const newTheme = value === "light" ? "light" : "dark";
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
