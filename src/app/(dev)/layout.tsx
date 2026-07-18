import React from "react";
import { DeveloperLayout } from "@/layouts/DeveloperLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DeveloperLayout>{children}</DeveloperLayout>;
}
