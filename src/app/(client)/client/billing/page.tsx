"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_INVOICES } from "@/mocks/billing";
import { formatCurrency } from "@/utils";
import { DollarSign, CreditCard, Download, ArrowRight, CircleCheck as CheckCircle2, Clock } from "lucide-react";

export default function ClientBillingPage() {
  const { addToast } = useNotifications();
  const invoices = MOCK_INVOICES.slice(0, 3);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((sum, i) => sum + (i.amount - i.amountPaid), 0);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Billing" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30">
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </span>
          <span>Billing & Invoices</span>
        </h1>
        <p className="text-xs text-slate-400">Review outstanding balances, payment history, and clear invoices securely.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Outstanding" value={formatCurrency(outstanding)} trend="up" change="2 invoices" info="Payable" />
        <MetricCard title="Paid (YTD)" value="$8,640" trend="up" change="+$1,500" info="Collected" />
        <MetricCard title="Next Due" value="Aug 1" info="In 14 days" trend="neutral" />
        <MetricCard title="Auto-Pay" value="Off" info="Not enrolled" trend="neutral" />
      </div>

      {/* Outstanding balance banner */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-600/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Outstanding balance: {formatCurrency(outstanding)}</p>
            <p className="text-[11px] text-slate-400">Pay now to avoid late fees on your active matters.</p>
          </div>
        </div>
        <Button
          variant="primary"
          className="bg-emerald-600 hover:bg-emerald-500"
          leftIcon={<CreditCard className="w-4 h-4" />}
          onClick={() => addToast("Payment Initiated", "Secure payment session started (simulated).", "success")}
        >
          Pay Now
        </Button>
      </div>

      {/* Invoice cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invoices.map((inv) => (
          <Card key={inv.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] text-slate-400">{inv.invoiceNumber}</div>
                <div className="mt-1 text-xl font-extrabold text-white">{formatCurrency(inv.amount)}</div>
                <div className="mt-1 text-[10px] text-slate-500">Due {inv.dueDate}</div>
              </div>
              <Badge label={inv.status} variant={inv.status === "Paid" ? "success" : "warning"} />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>Paid</span>
                <span className="font-bold text-emerald-400">{formatCurrency(inv.amountPaid)} / {formatCurrency(inv.amount)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${(inv.amountPaid / inv.amount) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {inv.status === "Paid" ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Payment received
                </span>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-500"
                  onClick={() => addToast("Payment Initiated", `Paying invoice ${inv.invoiceNumber}.`, "success")}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Pay invoice
                </Button>
              )}
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/40 hover:bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
