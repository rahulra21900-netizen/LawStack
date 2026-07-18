export interface Case {
  id: string;
  tenantId: string;
  clientId: string;
  title: string;
  caseNumber: string;
  practiceArea: string;
  stage: "Pleadings" | "Discovery" | "Pre-Trial" | "Trial" | "Appeal" | "Closed";
  status: "Active" | "Archived" | "Pending";
  leadCounsel: string;
  openDate: string;
  closeDate?: string;
}
