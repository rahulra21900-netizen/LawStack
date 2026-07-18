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
