import { Case } from "@/types";
import { MOCK_CASES } from "@/mocks/cases";

export const CaseService = {
  async getCases(): Promise<Case[]> {
    return [...MOCK_CASES];
  },
  async getCasesByTenant(tenantId: string): Promise<Case[]> {
    return MOCK_CASES.filter(c => c.tenantId === tenantId);
  },
  async getCaseById(id: string): Promise<Case | undefined> {
    return MOCK_CASES.find(c => c.id === id);
  }
};
