export interface Hearing {
  id: string;
  tenantId: string;
  caseId: string;
  judgeName: string;
  courtroom: string;
  location: string;
  dateTime: string;
  status: "Scheduled" | "Adjourned" | "Completed" | "Cancelled";
  outcome?: string;
}
