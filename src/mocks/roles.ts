export type RoleType =
  | "Platform Owner"
  | "Platform Admin"
  | "Tenant Owner"
  | "Partner"
  | "Associate"
  | "Junior Lawyer"
  | "Clerk"
  | "Client";

export interface Role {
  id: string;
  name: RoleType;
  description: string;
  scope: "platform" | "tenant" | "client" | "all";
}

export const MOCK_ROLES: Role[] = [
  {
    id: "platform-owner",
    name: "Platform Owner",
    description: "Full global administrative rights over the entire SaaS platform.",
    scope: "platform",
  },
  {
    id: "platform-admin",
    name: "Platform Admin",
    description: "Operational administration, billing, and provisioning support.",
    scope: "platform",
  },
  {
    id: "tenant-owner",
    name: "Tenant Owner",
    description: "Full control over a specific tenant firm workspace, billing, and members.",
    scope: "tenant",
  },
  {
    id: "partner",
    name: "Partner",
    description: "Senior legal team member, case supervisor, and financial viewer.",
    scope: "tenant",
  },
  {
    id: "associate",
    name: "Associate",
    description: "Standard legal counsel with full read-write access to cases and clients.",
    scope: "tenant",
  },
  {
    id: "junior-lawyer",
    name: "Junior Lawyer",
    description: "Assigned lawyer with access to active matters and documents under review.",
    scope: "tenant",
  },
  {
    id: "clerk",
    name: "Clerk",
    description: "Administrative staff, document entry, scheduling, and billing support.",
    scope: "tenant",
  },
  {
    id: "client",
    name: "Client",
    description: "External portal access for viewing active matters, invoices, and messaging counsel.",
    scope: "client",
  },
];
