"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuthSession, isProtectedRoute, type AuthSession } from "@/lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);

  // Read session on every pathname change (client-only, avoids SSR hydration flicker)
  useEffect(() => {
    setSession(getAuthSession());
  }, [pathname]);

  useEffect(() => {
    if (session === null) return; // Not yet resolved on client
    if (!isProtectedRoute(pathname)) return;

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
