import { useSimulation } from "@/providers/SimulationProvider";

export function useTenant() {
  const { activeTenant, setActiveTenant } = useSimulation();
  return {
    tenant: activeTenant,
    setTenant: setActiveTenant,
  };
}
