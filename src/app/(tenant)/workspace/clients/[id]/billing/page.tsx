"use client";

import React from "react";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";
import { formatCurrency } from "@/utils";

export default function BillingTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const clientInvoices = MOCK_INVOICES.filter((i) => i.clientId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Invoice History Logs"
        data={clientInvoices}
        columns={[
          { header: "Invoice Number", accessor: (i) => <span className="font-mono font-bold text-white">{i.invoiceNumber}</span> },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold">{formatCurrency(i.amount)}</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-400">{i.dueDate}</span> },
          { header: "Status", accessor: (i) => <Badge label={i.status} variant={i.status === "Paid" ? "success" : i.status === "Overdue" ? "error" : "warning"} /> }
        ]}
      />
    </div>
  );
}
