import { Task } from "@/types";

export const MOCK_TASKS: Task[] = [
  {
    id: "task-depose-stark",
    tenantId: "oakwood-llp",
    caseId: "case-acme",
    assignedToUser: "user-4", // Harvey Specter
    title: "Prepare Deposition Questions for Stark Patents",
    description: "Review prior engineering blueprints and compile standard examination guidelines.",
    status: "In_Progress",
    priority: "High",
    dueDate: "2026-07-25"
  },
  {
    id: "task-wayne-records",
    tenantId: "oakwood-llp",
    caseId: "case-wayne-tax",
    assignedToUser: "user-5", // Mike Ross
    title: "Collate tax ledger records from 2021-2024",
    description: "Download verified records from the safe repository and assemble index PDF.",
    status: "Todo",
    priority: "Critical",
    dueDate: "2026-07-20"
  },
  {
    id: "task-lex-filing",
    tenantId: "lexbridge-partners",
    caseId: "case-lexcorp-merger",
    assignedToUser: "user-8", // Louis Litt
    title: "File Anti-Trust Disclosure Statement",
    description: "Submit digital copy to Delaware Chancery Court registry.",
    status: "Completed",
    priority: "High",
    dueDate: "2026-06-30",
    completedDate: "2026-06-29"
  }
];
