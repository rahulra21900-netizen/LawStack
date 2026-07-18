import { CalendarEvent } from "@/types";
import { MOCK_CALENDAR_EVENTS } from "@/mocks/calendar";

export const CalendarService = {
  async getEvents(): Promise<CalendarEvent[]> {
    return [...MOCK_CALENDAR_EVENTS];
  },
  async getEventsByTenant(tenantId: string): Promise<CalendarEvent[]> {
    return MOCK_CALENDAR_EVENTS.filter(e => e.tenantId === tenantId);
  }
};
