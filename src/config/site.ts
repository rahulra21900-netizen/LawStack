import { APP_METADATA } from "@/constants/application";
import { ROLES_LIST } from "@/constants/roles";
import { PERMISSIONS } from "@/constants/permissions";
import { FEATURE_FLAGS } from "@/constants/featureFlags";

export const siteConfig = {
  name: APP_METADATA.NAME,
  description: "Enterprise multi-tenant legal operations platform prototype.",
  version: APP_METADATA.VERSION,
  buildDate: APP_METADATA.BUILD_DATE,
  environment: APP_METADATA.ENVIRONMENT,
  
  // Brand Configuration
  brand: {
    logoText: "LAWSTACK",
    subText: "V2",
    themeColor: "#2563eb", // Primary blue accent
    supportEmail: "support@lawstack.com",
  },

  // Role Configuration
  roles: {
    presets: ROLES_LIST,
    permissions: PERMISSIONS,
  },

  // Feature Flag Defaults
  featureFlags: {
    defaults: [
      { id: FEATURE_FLAGS.AI_COPILOT, enabled: true },
      { id: FEATURE_FLAGS.WS_NOTIFICATIONS, enabled: false },
      { id: FEATURE_FLAGS.BILLING_V2, enabled: true },
      { id: FEATURE_FLAGS.TENANT_ISOLATION, enabled: true },
    ],
  },
};
