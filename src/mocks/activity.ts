import { Activity } from "@/types";

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    tenantId: "oakwood-llp",
    userId: "user-4", // Priya Chandra Specter
    userName: "Priya Chandra Specter",
    action: "Approved draft version 1.4",
    entityType: "Document",
    entityId: "doc-stark-patent",
    details: "Checked engineering blueprints and approved file schedule A-1.",
    createdAt: "2026-07-18T12:00:00Z"
  },
  {
    id: "act-2",
    tenantId: "oakwood-llp",
    userId: "user-5", // Arjun Mehta
    userName: "Arjun Mehta",
    action: "Edited brief notes",
    entityType: "Document",
    entityId: "doc-wayne-ledger",
    details: "Updated philantrophic transaction histories index.",
    createdAt: "2026-07-18T10:15:00Z"
  }
];
