import { User } from "@/types";
import { MOCK_USERS } from "@/mocks/users";

export const UserService = {
  async getUsers(): Promise<User[]> {
    return [...MOCK_USERS];
  },
  async getUserById(id: string): Promise<User | undefined> {
    return MOCK_USERS.find(u => u.id === id);
  },
  async getUsersByTenant(tenantId: string): Promise<User[]> {
    return MOCK_USERS.filter(u => u.tenantId === tenantId);
  }
};
