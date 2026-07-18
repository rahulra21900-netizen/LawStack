import { Notification } from "@/types";
import { MOCK_NOTIFICATIONS } from "@/mocks/notifications";

export const NotificationService = {
  async getNotifications(userId: string): Promise<Notification[]> {
    return MOCK_NOTIFICATIONS.filter(n => n.userId === userId);
  }
};
