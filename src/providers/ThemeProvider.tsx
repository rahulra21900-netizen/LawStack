"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { THEMES } from "@/constants";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

function resolveTheme(input: string): "light" | "dark" {
  if (input === THEMES.SYSTEM) {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  }
  return input === "light" ? "light" : "dark";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeInternal] = useState<string>(THEMES.DARK);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const applied = resolveTheme(theme);
    const root = window.document.documentElement;
    root.setAttribute("data-theme", applied);
    // Keep legacy class-based hooks working too
    root.classList.remove("light", "dark");
    root.classList.add(applied);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeInternal }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
