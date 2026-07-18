import { redirect } from "next/navigation";
import React from "react";

export default function TenantDetailsRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  redirect(`/platform/tenant-administration/${id}/overview`);
}
