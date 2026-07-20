"use client";

import React from "react";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { formatCurrency } from "@/utils";

export default function BillingTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseInvoices = MOCK_INVOICES.filter((i) => i.caseId === id);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-xs">Billing Snapshot</div>}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-1.5 text-slate-400">
              <span>Retainer Balance</span>
              <span className="font-bold text-white">₹15,000.00</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Hours Billed YTD</span>
              <span className="font-bold text-white">42.5 hrs</span>
            </div>
          </div>
        </Card>
      </div>

      <DataTable
        title="Linked Invoice Records"
        data={caseInvoices}
        columns={[
          { header: "Invoice Number", accessor: (i) => <span className="font-mono text-white font-bold">{i.invoiceNumber}</span> },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold">{formatCurrency(i.amount)}</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-400">{i.dueDate}</span> },
          { header: "Status", accessor: (i) => <Badge label={i.status} variant={i.status === "Paid" ? "success" : i.status === "Overdue" ? "error" : "warning"} /> }
        ]}
      />
    </div>
  );
}
