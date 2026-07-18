import { Notification } from "@/types";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    userId: "user-4",
    tenantId: "oakwood-llp",
    title: "Court Filing Confirmed",
    message: "Delaware Chancery Court statement filed successfully for LexCorp Merger.",
    type: "Case_Update",
    read: false,
    createdAt: "2026-07-18T14:40:00Z"
  },
  {
    id: "notif-2",
    userId: "user-4",
    tenantId: "oakwood-llp",
    title: "Billing Cycle Invoice Overdue",
    message: "Invoice INV-2026-0044 is past due for Wayne Enterprises.",
    type: "Billing",
    read: false,
    createdAt: "2026-07-18T09:00:00Z"
  }
];
