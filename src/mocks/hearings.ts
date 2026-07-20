import { Hearing } from "@/types";

export const MOCK_HEARINGS: Hearing[] = [
  {
    id: "hearing-sharma-bail",
    tenantId: "chandra-associates",
    caseId: "case-sharma-bail",
    judgeName: "Hon. Justice Anil Kumar",
    courtroom: "Court No. 24",
    location: "Delhi High Court, Sher Shah Road, New Delhi",
    dateTime: "2026-07-21T10:30:00Z",
    status: "Scheduled",
  },
  {
    id: "hearing-reliance-ip",
    tenantId: "chandra-associates",
    caseId: "case-reliance-ip",
    judgeName: "Hon. Justice Prathiba M. Singh",
    courtroom: "Court No. 8 (IP Division)",
    location: "Delhi High Court",
    dateTime: "2026-07-25T11:00:00Z",
    status: "Scheduled",
  },
  {
    id: "hearing-oakwood-nclt",
    tenantId: "verma-partners",
    caseId: "case-oakwood-merger",
    judgeName: "Hon. Member (Judicial) R. Sudhakar",
    courtroom: "Court Hall 2",
    location: "NCLT Mumbai, Prabhadevi",
    dateTime: "2026-08-05T10:00:00Z",
    status: "Scheduled",
  },
];
