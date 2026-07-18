export interface MockReport {
  id: string;
  tenantId: string;
  title: string;
  type: "Billing" | "Case_Workload" | "Audits";
  generatedBy: string;
  createdAt: string;
}

export const MOCK_REPORTS: MockReport[] = [
  {
    id: "rep-bill-q2",
    tenantId: "oakwood-llp",
    title: "Q2 Financial Billing Summary & Realized Income",
    type: "Billing",
    generatedBy: "Donna Paulsen",
    createdAt: "2026-06-30T17:00:00Z"
  }
];
