import { Document } from "@/types";
import { MOCK_DOCUMENTS } from "@/mocks/documents";

export const DocumentService = {
  async getDocuments(): Promise<Document[]> {
    return [...MOCK_DOCUMENTS];
  },
  async getDocumentsByTenant(tenantId: string): Promise<Document[]> {
    return MOCK_DOCUMENTS.filter(d => d.tenantId === tenantId);
  },
  async getDocumentsByCase(caseId: string): Promise<Document[]> {
    return MOCK_DOCUMENTS.filter(d => d.caseId === caseId);
  }
};
