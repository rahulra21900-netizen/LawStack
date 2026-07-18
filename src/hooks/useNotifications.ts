import { useNotifications as useNotifContext } from "@/providers/NotificationProvider";

export function useNotifications() {
  return useNotifContext();
}
