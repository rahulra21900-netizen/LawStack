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
    id: "chandra-associates",
    name: "Chandra & Associates",
    subdomain: "chandra",
    status: "Active",
    tier: "Enterprise",
    joinedDate: "2024-01-15",
    primaryColor: "#0f172a", // slate-900
  },
  {
    id: "iyer-legal",
    name: "Iyer Legal Chambers",
    subdomain: "iyerlegal",
    status: "Active",
    tier: "Standard",
    joinedDate: "2024-03-22",
    primaryColor: "#0284c7", // sky-600
  },
  {
    id: "rahul-advocate",
    name: "Rahul Bansal — Advocate (Solo Practice)",
    subdomain: "rbansal",
    status: "Active",
    tier: "Standard",
    joinedDate: "2024-05-10",
    primaryColor: "#d97706", // amber-600
  },
  {
    id: "verma-partners",
    name: "Verma & Partners LLP",
    subdomain: "vermapartners",
    status: "Active",
    tier: "Enterprise",
    joinedDate: "2023-11-01",
    primaryColor: "#059669", // emerald-600
  },
  {
    id: "nova-law",
    name: "Nova Law Group",
    subdomain: "novalaw",
    status: "Suspended",
    tier: "Professional",
    joinedDate: "2025-02-18",
    primaryColor: "#7c3aed", // violet-600
  },
  {
    id: "justice-associates",
    name: "Justice Associates (Bengaluru)",
    subdomain: "justice",
    status: "Pending",
    tier: "Standard",
    joinedDate: "2026-06-10",
    primaryColor: "#dc2626", // red-600
  },
];
