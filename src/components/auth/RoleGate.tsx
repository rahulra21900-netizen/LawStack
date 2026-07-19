"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export function RoleGate({ children, allowedRoles, fallback }: { children: React.ReactNode; allowedRoles: string[]; fallback?: React.ReactNode }) {
  const pathname = usePathname();
  const session = useMemo(() => getAuthSession(), [pathname]);

  if (!session.authenticated || !allowedRoles.includes(session.role)) {
    return <>{fallback ?? null}</>;
  }

  return <>{children}</>;
}
