import { Document } from "@/types";

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-stark-patent",
    tenantId: "oakwood-llp",
    caseId: "case-reliance-ip",
    title: "Arc Reactor Patents Schedule A-1",
    type: "Discovery",
    status: "Approved",
    author: "Priya Chandra Specter",
    version: "1.4",
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-04-18T14:30:00Z",
    fileSizeBytes: 2450892
  },
  {
    id: "doc-wayne-ledger",
    tenantId: "oakwood-llp",
    caseId: "case-krishna-tax",
    title: "Wayne Foundation Philanthropic Audits FY25",
    type: "Brief",
    status: "Under Review",
    author: "Arjun Mehta",
    version: "0.9",
    createdAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-07-10T16:15:00Z",
    fileSizeBytes: 15402932
  },
  {
    id: "doc-lexcorp-nda",
    tenantId: "verma-partners",
    caseId: "case-oakwood-merger",
    title: "Non-Disclosure Agreement - Apex acquisition",
    type: "Contract",
    status: "Approved",
    author: "Louis Litt",
    version: "2.0",
    createdAt: "2025-11-20T11:00:00Z",
    updatedAt: "2025-11-22T09:30:00Z",
    fileSizeBytes: 145028
  }
];
