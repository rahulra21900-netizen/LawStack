"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TenantLayout } from "@/layouts/TenantLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/tenant/login" || pathname === "/tenant/signup";

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return <TenantLayout>{children}</TenantLayout>;
}
