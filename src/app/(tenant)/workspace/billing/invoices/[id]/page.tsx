import { redirect } from "next/navigation";
import React from "react";

export default function InvoiceDetailsRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  redirect(`/workspace/billing/invoices/${id}/overview`);
}
