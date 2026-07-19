"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PlatformLayout } from "@/layouts/PlatformLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname === "/platform/login" ||
    pathname === "/platform/signup" ||
    pathname === "/platform/mfa";

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return <PlatformLayout>{children}</PlatformLayout>;
}
