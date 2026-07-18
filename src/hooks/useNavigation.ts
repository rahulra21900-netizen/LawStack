import { useNavigation as useNavContext } from "@/providers/NavigationProvider";

export function useNavigation() {
  return useNavContext();
}
