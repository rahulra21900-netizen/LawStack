import { CalendarEvent } from "@/types";

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "event-stark-depo",
    tenantId: "oakwood-llp",
    caseId: "case-acme",
    title: "Stark Industries Deposition Hearing",
    type: "Hearing",
    startDateTime: "2026-07-24T10:00:00Z",
    endDateTime: "2026-07-24T16:00:00Z",
    location: "Federal District Court Room 3C",
    description: "Compulsory examination of defense engineers."
  },
  {
    id: "event-wayne-meet",
    tenantId: "oakwood-llp",
    caseId: "case-wayne-tax",
    title: "Strategy Session with Bruce Wayne",
    type: "Client_Meeting",
    startDateTime: "2026-07-19T15:30:00Z",
    endDateTime: "2026-07-19T16:30:00Z",
    location: "Oakwood Main Conference Suite",
    description: "Pre-hearing briefing on tax filings audit."
  }
];
