import { useSimulation } from "@/providers/SimulationProvider";

export function useRole() {
  const { activeRole, setActiveRole } = useSimulation();
  return {
    role: activeRole,
    setRole: setActiveRole,
  };
}
