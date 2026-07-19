"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuthSession, isProtectedRoute } from "@/lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useMemo(() => getAuthSession(), [pathname]);

  useEffect(() => {
    if (!isProtectedRoute(pathname)) {
      return;
    }

    if (!session.authenticated) {
      router.replace("/tenant/login");
      return;
    }

    if (pathname.startsWith("/platform") && !session.mfaVerified) {
      router.replace("/platform/mfa");
      return;
    }

    if (pathname.startsWith("/workspace") && !session.mfaVerified) {
      router.replace("/tenant/mfa");
    }
  }, [pathname, router, session]);

  return <>{children}</>;
}
