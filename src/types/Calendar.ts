export interface CalendarEvent {
  id: string;
  tenantId: string;
  caseId?: string;
  title: string;
  type: "Hearing" | "Client_Meeting" | "Internal_Review" | "Filing_Deadline";
  startDateTime: string;
  endDateTime: string;
  location?: string;
  description?: string;
}
