export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: "Active" | "Suspended" | "Pending";
  tier: "Standard" | "Professional" | "Enterprise";
  joinedDate: string;
  primaryColor: string;
}
