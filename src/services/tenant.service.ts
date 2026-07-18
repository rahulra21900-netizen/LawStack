import { Tenant } from "@/types";
import { MOCK_TENANTS } from "@/mocks/tenants";

export const TenantService = {
  async getTenants(): Promise<Tenant[]> {
    return [...MOCK_TENANTS];
  },
  async getTenantById(id: string): Promise<Tenant | undefined> {
    return MOCK_TENANTS.find(t => t.id === id);
  }
};
