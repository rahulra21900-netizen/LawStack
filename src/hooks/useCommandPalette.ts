import { useCommandPalette as usePaletteContext } from "@/providers/CommandPaletteProvider";

export function useCommandPalette() {
  return usePaletteContext();
}
