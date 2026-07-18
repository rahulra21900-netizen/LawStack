import { AiInteraction } from "@/types";
import { MOCK_AI_HISTORY } from "@/mocks/ai";

export const AiService = {
  async getHistoryByTenant(tenantId: string): Promise<AiInteraction[]> {
    return MOCK_AI_HISTORY.filter(ai => ai.tenantId === tenantId);
  }
};
