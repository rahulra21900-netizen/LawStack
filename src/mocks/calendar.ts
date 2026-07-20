import { CalendarEvent } from "@/types";

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "event-reliance-ip",
    tenantId: "chandra-associates",
    caseId: "case-reliance-ip",
    title: "Reliance Retail — IP Injunction Arguments",
    type: "Hearing",
    startDateTime: "2026-07-25T10:30:00Z",
    endDateTime: "2026-07-25T13:30:00Z",
    location: "Delhi High Court, Court No. 8 (IP Division)",
    description: "Interim injunction hearing under Trade Marks Act §29(4).",
  },
  {
    id: "event-krishna-meet",
    tenantId: "chandra-associates",
    caseId: "case-krishna-tax",
    title: "Client Strategy Session — Krishna Textiles",
    type: "Client_Meeting",
    startDateTime: "2026-07-19T10:00:00Z",
    endDateTime: "2026-07-19T11:00:00Z",
    location: "Chandra & Associates, Barakhamba Road, New Delhi",
    description: "Pre-hearing briefing on §68 addition arguments.",
  },
];
