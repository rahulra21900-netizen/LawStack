"use client";

import { useMemo } from "react";
import { getAuthSession } from "@/lib/auth";

export function TenantBoundary({ children, tenantId, fallback }: { children: React.ReactNode; tenantId?: string | null; fallback?: React.ReactNode }) {
  const session = useMemo(() => getAuthSession(), [tenantId]);

  if (tenantId && session.tenantId && session.tenantId !== tenantId) {
    return <>{fallback ?? null}</>;
  }

  return <>{children}</>;
}
