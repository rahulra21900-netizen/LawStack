import { DocumentTemplate } from "@/types";

export const MOCK_TEMPLATES: DocumentTemplate[] = [
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
