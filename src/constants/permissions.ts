export const PERMISSIONS = {
  PLATFORM: {
    MANAGE_TENANTS: "platform:manage_tenants",
    PROVISION_TENANTS: "platform:provision_tenants",
    VIEW_AUDIT_LOGS: "platform:view_audit_logs",
    MANAGE_SETTINGS: "platform:manage_settings",
  },
  TENANT: {
    MANAGE_FIRM: "tenant:manage_firm",
    MANAGE_TEAM: "tenant:manage_team",
    VIEW_BILLING: "tenant:view_billing",
    MANAGE_CASES: "tenant:manage_cases",
    MANAGE_DOCUMENTS: "tenant:manage_documents",
    USE_AI: "tenant:use_ai",
  },
  CLIENT: {
    VIEW_MATTERS: "client:view_matters",
    VIEW_INVOICES: "client:view_invoices",
    SEND_MESSAGES: "client:send_messages",
  }
};
