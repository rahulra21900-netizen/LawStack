import { Hearing } from "@/types";

export const MOCK_HEARINGS: Hearing[] = [
  {
    id: "hearing-stark-patent",
    tenantId: "oakwood-llp",
    caseId: "case-acme",
    judgeName: "Hon. Sarah Vance",
    courtroom: "Courtroom 3C",
    location: "Federal Building, New York",
    dateTime: "2026-07-24T10:00:00Z",
    status: "Scheduled"
  },
  {
    id: "hearing-lexcorp-motion",
    tenantId: "lexbridge-partners",
    caseId: "case-lexcorp-merger",
    judgeName: "Hon. William Miller",
    courtroom: "Delaware Chancery Room 12",
    location: "Chancery Court, Wilmington",
    dateTime: "2026-07-28T09:30:00Z",
    status: "Scheduled"
  }
];
