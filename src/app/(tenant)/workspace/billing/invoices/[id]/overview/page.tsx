"use client";

import React from "react";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_INVOICES } from "@/mocks/billing";
import { formatCurrency } from "@/utils";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const invoiceData = MOCK_INVOICES.find((i) => i.id === id);

  if (!invoiceData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Invoice amount" value={formatCurrency(invoiceData.amount)} info="Total amount billed" />
        <MetricCard title="Paid amount" value={formatCurrency(invoiceData.amountPaid)} info="Total collected" trend="up" />
        <MetricCard title="Due Date" value={invoiceData.dueDate} info="Settlement reminder" />
      </div>
    </div>
  );
}
