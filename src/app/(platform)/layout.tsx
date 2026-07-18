import React from "react";
import { PlatformLayout } from "@/layouts/PlatformLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PlatformLayout>{children}</PlatformLayout>;
}
