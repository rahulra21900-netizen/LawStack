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
    name: "Aditya Menon",
    email: "aditya.menon@lawstack.in",
    role: "Platform Owner",
  },
  {
    id: "user-2",
    name: "Shruti Kapoor",
    email: "shruti.kapoor@lawstack.in",
    role: "Platform Admin",
  },
  {
    id: "user-3",
    name: "Meera Verma",
    email: "meera@chandra.legal",
    role: "Tenant Owner",
    tenantId: "chandra-associates",
  },
  {
    id: "user-4",
    name: "Priya Chandra",
    email: "priya@chandra.legal",
    role: "Partner",
    tenantId: "chandra-associates",
  },
  {
    id: "user-5",
    name: "Arjun Mehta",
    email: "arjun@chandra.legal",
    role: "Associate",
    tenantId: "chandra-associates",
  },
  {
    id: "user-6",
    name: "Neha Iyer",
    email: "neha@chandra.legal",
    role: "Junior Lawyer",
    tenantId: "chandra-associates",
  },
  {
    id: "user-7",
    name: "Kabir Singh",
    email: "kabir@chandra.legal",
    role: "Clerk",
    tenantId: "chandra-associates",
  },
  {
    id: "user-8",
    name: "Rohit Malhotra",
    email: "rohit@verma-partners.in",
    role: "Tenant Owner",
    tenantId: "verma-partners",
  },
  {
    id: "user-9",
    name: "Rakesh Sharma",
    email: "rakesh.sharma@protonmail.com",
    role: "Client",
    tenantId: "chandra-associates",
  },
];
