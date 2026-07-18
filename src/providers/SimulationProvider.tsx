"use client";

import React, { createContext, useContext, useState } from "react";
import { User, Tenant, FeatureFlag } from "@/types";
import { MOCK_USERS } from "@/mocks/users";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { MOCK_SETTINGS } from "@/mocks/settings";

interface SimulationContextProps {
  activeUser: User;
  activeRole: string;
  activeTenant: Tenant;
  featureFlags: FeatureFlag[];
  setActiveUser: (user: User) => void;
  setActiveRole: (role: string) => void;
  setActiveTenant: (tenant: Tenant) => void;
  toggleFeatureFlag: (flagId: string) => void;
}

const SimulationContext = createContext<SimulationContextProps | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUser, setActiveUserInternal] = useState<User>(MOCK_USERS[0] as User);
  const [activeRole, setActiveRole] = useState<string>(MOCK_USERS[0].role);
  const [activeTenant, setActiveTenant] = useState<Tenant>(MOCK_TENANTS[0]);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(MOCK_SETTINGS.featureFlags);

  const setActiveUser = (user: User) => {
    setActiveUserInternal(user);
    setActiveRole(user.role);
    if (user.tenantId) {
      const tenant = MOCK_TENANTS.find((t) => t.id === user.tenantId);
      if (tenant) {
        setActiveTenant(tenant);
      }
    }
  };

  const toggleFeatureFlag = (flagId: string) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === flagId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <SimulationContext.Provider
      value={{
        activeUser,
        activeRole,
        activeTenant,
        featureFlags,
        setActiveUser,
        setActiveRole,
        setActiveTenant,
        toggleFeatureFlag,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within SimulationProvider");
  return context;
};
