import { DocumentTemplate } from "@/types";

export const MOCK_TEMPLATES: DocumentTemplate[] = [
  {
    id: "tmpl-vakalatnama",
    tenantId: "oakwood-llp",
    name: "High Court & District Court Vakalatnama Standard",
    description: "Standard Bar Council prescribed authorization of advocate form with advocate stamp & signature clauses.",
    practiceArea: "Litigation & Court Procedure",
    version: "2026.1",
    lastUpdated: "2026-02-10"
  },
  {
    id: "tmpl-anticipatory-bail",
    tenantId: "oakwood-llp",
    name: "Anticipatory Bail Application (BNSS Sec 482 / IPC Sec 438)",
    description: "Pre-drafted bail petition with grounds of apprehension, stay of arrest, and compliance affidavit.",
    practiceArea: "Criminal Defense",
    version: "2026.2",
    lastUpdated: "2026-03-01"
  },
  {
    id: "tmpl-specific-performance",
    tenantId: "oakwood-llp",
    name: "Specific Performance Petition (Contract Act Sec 12-13)",
    description: "Commercial contract breach petition requesting specific performance, interim injunction, and damages.",
    practiceArea: "Corporate & Commercial",
    version: "2026.1",
    lastUpdated: "2026-02-18"
  },
  {
    id: "tmpl-nda",
    tenantId: "oakwood-llp",
    name: "Mutual Non-Disclosure Agreement (Standard)",
    description: "Standard model contract for initial merger conversations.",
    practiceArea: "Corporate Law",
    version: "2026.1",
    lastUpdated: "2026-01-05"
  },
  {
    id: "tmpl-ip-lic",
    tenantId: "oakwood-llp",
    name: "Patent & Tech Sub-License Agreement",
    description: "Cross-licensing framework with standard royalty schedule forms.",
    practiceArea: "Intellectual Property",
    version: "2025.4",
    lastUpdated: "2025-10-18"
  }
];
