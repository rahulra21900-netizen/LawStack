export interface Task {
  id: string;
  tenantId: string;
  caseId?: string;
  assignedToUser: string;
  title: string;
  description?: string;
  status: "Todo" | "In_Progress" | "Under_Review" | "Completed";
  priority: "Low" | "Medium" | "High" | "Critical";
  dueDate: string;
  completedDate?: string;
}
