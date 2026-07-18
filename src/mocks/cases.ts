import { Case } from "@/types";

export const MOCK_CASES: Case[] = [
  {
    id: "case-acme",
    tenantId: "oakwood-llp",
    clientId: "client-stark",
    title: "Stark Industries vs. Advanced Tech Corp",
    caseNumber: "CV-2026-9042",
    practiceArea: "Intellectual Property",
    stage: "Discovery",
    status: "Active",
    leadCounsel: "Harvey Specter",
    openDate: "2026-01-10"
  },
  {
    id: "case-wayne-tax",
    tenantId: "oakwood-llp",
    clientId: "client-wayne",
    title: "IRS Auditing vs. Wayne Enterprises",
    caseNumber: "TX-2026-0041",
    practiceArea: "Tax Law",
    stage: "Pleadings",
    status: "Active",
    leadCounsel: "Mike Ross",
    openDate: "2026-03-22"
  },
  {
    id: "case-lexcorp-merger",
    tenantId: "lexbridge-partners",
    clientId: "client-luthor",
    title: "In re LexCorp Acquisition of Apex Chem",
    caseNumber: "CORP-2025-1102",
    practiceArea: "Corporate Law",
    stage: "Pre-Trial",
    status: "Active",
    leadCounsel: "Louis Litt",
    openDate: "2025-11-15"
  }
];
