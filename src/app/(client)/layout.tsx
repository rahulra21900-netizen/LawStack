import React from "react";
import { ClientLayout } from "@/layouts/ClientLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
