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
