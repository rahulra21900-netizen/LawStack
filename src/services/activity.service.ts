import { Activity } from "@/types";
import { MOCK_ACTIVITIES } from "@/mocks/activity";

export const ActivityService = {
  async getActivitiesByTenant(tenantId: string): Promise<Activity[]> {
    return MOCK_ACTIVITIES.filter(a => a.tenantId === tenantId);
  }
};
