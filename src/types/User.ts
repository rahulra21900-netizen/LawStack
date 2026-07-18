import { RoleType } from "./Role";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: RoleType;
  tenantId?: string;
}
