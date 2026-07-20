export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: "Active" | "Suspended" | "Pending";
  tier: "Standard" | "Professional" | "Enterprise";
  joinedDate: string;
  primaryColor: string;
}

export const MOCK_TENANTS: Tenant[] = [
  {
    id: "oakwood-llp",
    name: "Oakwood LLP",
    subdomain: "oakwood",
    status: "Active",
    tier: "Enterprise",
    joinedDate: "2024-01-15",
    primaryColor: "#0f172a", // slate-900
  },
  {
    id: "abc-legal",
    name: "ABC Legal",
    subdomain: "abc-legal",
    status: "Active",
    tier: "Standard",
    joinedDate: "2024-03-22",
    primaryColor: "#0284c7", // sky-600
  },
  {
    id: "rahul-advocate",
    name: "Rahul Advocate (Solo Practice)",
    subdomain: "rahul-advocate",
    status: "Active",
    tier: "Standard",
    joinedDate: "2024-05-10",
    primaryColor: "#d97706", // amber-600
  },
  {
    id: "lexbridge-partners",
    name: "LexBridge Partners",
    subdomain: "lexbridge",
    status: "Active",
    tier: "Enterprise",
    joinedDate: "2023-11-01",
    primaryColor: "#059669", // emerald-600
  },
  {
    id: "nova-law-group",
    name: "Nova Law Group",
    subdomain: "novalaw",
    status: "Suspended",
    tier: "Professional",
    joinedDate: "2025-02-18",
    primaryColor: "#7c3aed", // violet-600
  },
  {
    id: "justice-associates",
    name: "Justice Associates",
    subdomain: "justice",
    status: "Pending",
    tier: "Standard",
    joinedDate: "2026-06-10",
    primaryColor: "#dc2626", // red-600
  },
];
