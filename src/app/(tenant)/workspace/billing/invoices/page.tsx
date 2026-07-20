"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_INVOICES } from "@/mocks/billing";
import { DollarSign, Download, Plus } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/utils";

export default function InvoicesListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = MOCK_INVOICES.filter((i) => i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Billing", href: "/workspace/billing" }, { name: "Invoices" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <span>Invoices Ledger</span>
          </h1>
          <p className="text-xs text-slate-400">Search and audit client bills, payments, and overdue accounts.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Invoices", "Invoice spreadsheet CSV exported.", "success")}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => addToast("Create Invoice", "Invoice creation wizard launched.", "info")}
          >
            New Invoice
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by invoice number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Invoice Statuses", value: "all" },
            { label: "Paid", value: "Paid" },
            { label: "Unpaid", value: "Unpaid" },
            { label: "Overdue", value: "Overdue" }
          ]}
          onChange={() => {}}
        />
      </div>

      {/* Invoices Data Table */}
      <DataTable
        data={filteredInvoices}
        columns={[
          {
            header: "Invoice Number",
            accessor: (i) => (
              <Link href={`/workspace/billing/invoices/${i.id}`} className="font-bold text-blue-400 hover:underline">
                {i.invoiceNumber}
              </Link>
            )
          },
          { header: "Total Amount", accessor: (i) => <span className="font-semibold text-white">{formatCurrency(i.amount)}</span> },
          { header: "Due Date", accessor: (i) => <span className="text-slate-400">{i.dueDate}</span> },
          { header: "Status", accessor: (i) => <Badge label={i.status} variant={i.status === "Paid" ? "success" : i.status === "Overdue" ? "error" : "warning"} /> }
        ]}
      />
    </div>
  );
}
