export interface Notification {
  id: string;
  userId: string;
  tenantId?: string;
  title: string;
  message: string;
  type: "System" | "Security" | "Billing" | "Case_Update" | "Mention";
  read: boolean;
  createdAt: string;
}
