"use client";

import React, { createContext, useContext, useState } from "react";
import { PlatformSettings } from "@/types";
import { MOCK_SETTINGS } from "@/mocks/settings";

interface SettingsContextProps {
  settings: PlatformSettings;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PlatformSettings>(MOCK_SETTINGS);

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
