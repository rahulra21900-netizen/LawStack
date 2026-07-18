export interface AiInteraction {
  id: string;
  tenantId: string;
  userId: string;
  prompt: string;
  response: string;
  tokensUsed: number;
  createdAt: string;
}
