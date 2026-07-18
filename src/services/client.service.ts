import { Client } from "@/types";
import { MOCK_CLIENTS } from "@/mocks/clients";

export const ClientService = {
  async getClients(): Promise<Client[]> {
    return [...MOCK_CLIENTS];
  },
  async getClientsByTenant(tenantId: string): Promise<Client[]> {
    return MOCK_CLIENTS.filter(c => c.tenantId === tenantId);
  },
  async getClientById(id: string): Promise<Client | undefined> {
    return MOCK_CLIENTS.find(c => c.id === id);
  }
};
