import { RoleType } from "./roles";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: RoleType;
  tenantId?: string; // Optional (undefined for platform roles)
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-1",
    name: "Alexander Mercer",
    email: "mercer@lawstack.com",
    role: "Platform Owner",
  },
  {
    id: "user-2",
    name: "Sarah Jenkins",
    email: "jenkins@lawstack.com",
    role: "Platform Admin",
  },
  {
    id: "user-3",
    name: "Eleanor Vance",
    email: "evance@oakwood.com",
    role: "Tenant Owner",
    tenantId: "oakwood-llp",
  },
  {
    id: "user-4",
    name: "Harvey Specter",
    email: "specter@oakwood.com",
    role: "Partner",
    tenantId: "oakwood-llp",
  },
  {
    id: "user-5",
    name: "Mike Ross",
    email: "ross@oakwood.com",
    role: "Associate",
    tenantId: "oakwood-llp",
  },
  {
    id: "user-6",
    name: "Rachel Zane",
    email: "rzane@oakwood.com",
    role: "Junior Lawyer",
    tenantId: "oakwood-llp",
  },
  {
    id: "user-7",
    name: "Donna Paulsen",
    email: "donna@oakwood.com",
    role: "Clerk",
    tenantId: "oakwood-llp",
  },
  {
    id: "user-8",
    name: "Louis Litt",
    email: "litt@lexbridge.com",
    role: "Tenant Owner",
    tenantId: "lexbridge-partners",
  },
  {
    id: "user-9",
    name: "Bruce Wayne",
    email: "bruce@waynecorp.com",
    role: "Client",
    tenantId: "oakwood-llp",
  },
];
