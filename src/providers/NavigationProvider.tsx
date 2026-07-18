"use client";

import React, { createContext, useContext, useState } from "react";

interface NavigationContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeLayout: string;
  setActiveLayout: (layout: string) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState("public");

  return (
    <NavigationContext.Provider value={{ sidebarOpen, setSidebarOpen, activeLayout, setActiveLayout }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within NavigationProvider");
  return context;
};
