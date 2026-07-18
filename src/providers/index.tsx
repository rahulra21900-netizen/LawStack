"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SimulationProvider } from "./SimulationProvider";
import { NavigationProvider } from "./NavigationProvider";
import { NotificationProvider } from "./NotificationProvider";
import { SettingsProvider } from "./SettingsProvider";
import { CommandPaletteProvider } from "./CommandPaletteProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SimulationProvider>
        <SettingsProvider>
          <NotificationProvider>
            <NavigationProvider>
              <CommandPaletteProvider>
                {children}
              </CommandPaletteProvider>
            </NavigationProvider>
          </NotificationProvider>
        </SettingsProvider>
      </SimulationProvider>
    </ThemeProvider>
  );
}

export * from "./ThemeProvider";
export * from "./SimulationProvider";
export * from "./NavigationProvider";
export * from "./NotificationProvider";
export * from "./SettingsProvider";
export * from "./CommandPaletteProvider";
