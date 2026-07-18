export interface Activity {
  id: string;
  tenantId?: string;
  userId: string;
  userName: string;
  action: string;
  entityType: "Case" | "Document" | "Client" | "User" | "Billing" | "System";
  entityId: string;
  details?: string;
  createdAt: string;
}
