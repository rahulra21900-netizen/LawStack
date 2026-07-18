export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface PlatformSettings {
  allowNewRegistrations: boolean;
  maintenanceMode: boolean;
  defaultTenantTier: "Standard" | "Professional" | "Enterprise";
  featureFlags: FeatureFlag[];
}

export const MOCK_SETTINGS: PlatformSettings = {
  allowNewRegistrations: true,
  maintenanceMode: false,
  defaultTenantTier: "Professional",
  featureFlags: [
    {
      id: "ai-copilot",
      name: "AI Document Analysis & Drafting",
      description: "Enables AI chat and document generation workflows.",
      enabled: true,
    },
    {
      id: "multi-tenant-isolation",
      name: "Strict Tenant Workspace Isolation",
      description: "Controls whether user accounts can belong to multiple tenants.",
      enabled: true,
    },
    {
      id: "real-time-notifications",
      name: "WebSocket Notifications System",
      description: "Enables toast and banner alerts for dynamic legal events.",
      enabled: false,
    },
    {
      id: "billing-v2",
      name: "Advanced Automated Ledgers & Invoicing",
      description: "Switches workspace billing to the new high-performance architecture.",
      enabled: true,
    },
  ],
};
