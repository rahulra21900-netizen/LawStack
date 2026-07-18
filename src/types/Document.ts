export interface Document {
  id: string;
  tenantId: string;
  caseId?: string;
  title: string;
  type: "Contract" | "Pleading" | "Motion" | "Brief" | "Discovery" | "Internal";
  status: "Draft" | "Under Review" | "Approved" | "Filed";
  author: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  fileSizeBytes: number;
}
