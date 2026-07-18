import { AiInteraction } from "@/types";

export const MOCK_AI_HISTORY: AiInteraction[] = [
  {
    id: "ai-int-1",
    tenantId: "oakwood-llp",
    userId: "user-4",
    prompt: "Summarize patent brief Arc Reactor Patents Schedule A-1.",
    response: "This document defines specifications for compact clean-energy generator cells, identifying 12 core claims.",
    tokensUsed: 890,
    createdAt: "2026-07-17T15:00:00Z"
  }
];
