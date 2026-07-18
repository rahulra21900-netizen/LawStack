import { Client } from "@/types";

export const MOCK_CLIENTS: Client[] = [
  {
    id: "client-wayne",
    tenantId: "oakwood-llp",
    name: "Bruce Wayne",
    companyName: "Wayne Enterprises",
    email: "bruce@waynecorp.com",
    phone: "555-0199",
    status: "Active",
    onboardingDate: "2024-02-10"
  },
  {
    id: "client-stark",
    tenantId: "oakwood-llp",
    name: "Tony Stark",
    companyName: "Stark Industries",
    email: "tony@starkindustries.com",
    phone: "555-0248",
    status: "Active",
    onboardingDate: "2024-05-18"
  },
  {
    id: "client-luthor",
    tenantId: "lexbridge-partners",
    name: "Lex Luthor",
    companyName: "LexCorp",
    email: "lex@lexcorp.com",
    phone: "555-9988",
    status: "Active",
    onboardingDate: "2023-12-01"
  },
  {
    id: "client-kent",
    tenantId: "lexbridge-partners",
    name: "Clark Kent",
    companyName: "Daily Planet",
    email: "clark@dailyplanet.com",
    phone: "555-1212",
    status: "Prospect",
    onboardingDate: "2025-06-15"
  }
];
