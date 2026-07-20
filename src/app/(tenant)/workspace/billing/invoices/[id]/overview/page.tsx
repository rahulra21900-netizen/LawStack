"use client";

import React from "react";
import { MOCK_INVOICES } from "@/mocks/billing";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { MOCK_CASES } from "@/mocks/cases";
import { formatCurrency } from "@/utils";
import { Card } from "@/components/cards";
import { Badge, Button } from "@/components/ui";
import { Download, Printer, QrCode, Send, ShieldCheck } from "lucide-react";

// Simple Indian rupee → words converter for invoice compliance
function numberToWords(num: number): string {
  if (num === 0) return "Rupees Zero Only";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const n = Math.floor(num);
  const p = Math.round((num - n) * 100);
  const inWords = (x: number): string => {
    if (x < 20) return a[x];
    if (x < 100) return `${b[Math.floor(x / 10)]}${x % 10 ? " " + a[x % 10] : ""}`;
    if (x < 1000) return `${a[Math.floor(x / 100)]} Hundred${x % 100 ? " " + inWords(x % 100) : ""}`;
    if (x < 100000) return `${inWords(Math.floor(x / 1000))} Thousand${x % 1000 ? " " + inWords(x % 1000) : ""}`;
    if (x < 10000000) return `${inWords(Math.floor(x / 100000))} Lakh${x % 100000 ? " " + inWords(x % 100000) : ""}`;
    return `${inWords(Math.floor(x / 10000000))} Crore${x % 10000000 ? " " + inWords(x % 10000000) : ""}`;
  };
  const rupees = `Rupees ${inWords(n)}`;
  const paise = p > 0 ? ` and ${inWords(p)} Paise` : "";
  return `${rupees}${paise} Only`;
}

// Derive HSN/SAC + tax split based on case + amount
function deriveInvoiceModel(amount: number, isInterState: boolean) {
  const taxable = Number((amount / 1.18).toFixed(2)); // work back subtotal from GST-inclusive
  const igst = isInterState ? Number((taxable * 0.18).toFixed(2)) : 0;
  const cgst = !isInterState ? Number((taxable * 0.09).toFixed(2)) : 0;
  const sgst = !isInterState ? Number((taxable * 0.09).toFixed(2)) : 0;
  return { taxable, cgst, sgst, igst, total: Number((taxable + cgst + sgst + igst).toFixed(2)) };
}

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const invoice = MOCK_INVOICES.find((i) => i.id === id);
  if (!invoice) return null;

  const client = MOCK_CLIENTS.find((c) => c.id === invoice.clientId);
  const matter = MOCK_CASES.find((c) => c.id === invoice.caseId);

  // Determine intra vs. inter-state by client company (mock heuristic)
  const isInterState = client?.companyName?.toLowerCase().includes("reliance") || client?.companyName?.toLowerCase().includes("oakwood");
  const { taxable, cgst, sgst, igst, total } = deriveInvoiceModel(invoice.amount, !!isInterState);

  const lineItems = [
    {
      description: "Professional legal services — drafting, filing & appearances",
      hsn: "998216",
      qty: 1,
      rate: taxable,
      amount: taxable,
    },
  ];

  return (
    <div className="space-y-6" data-testid="invoice-overview">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge label="Tax Invoice" variant="info" />
          <Badge label={invoice.status} variant={invoice.status === "Paid" ? "success" : invoice.status === "Overdue" ? "error" : "warning"} />
          <span className="text-[10px] font-mono text-slate-500">{isInterState ? "IGST · Inter-State supply" : "CGST + SGST · Intra-State supply"}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" leftIcon={<Printer className="w-3.5 h-3.5" />} data-testid="invoice-print-btn">Print</Button>
          <Button variant="secondary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />} data-testid="invoice-download-pdf-btn">Download PDF</Button>
          <Button variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />} data-testid="invoice-send-btn">Send to client</Button>
        </div>
      </div>

      {/* Printable tax invoice */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 md:p-8 shadow-xl shadow-slate-950/40">
        {/* Masthead */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-800">
          <div className="md:col-span-2 space-y-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Original for Recipient</div>
            <h2 className="font-serif text-2xl font-bold text-white leading-tight">Tax Invoice</h2>
            <p className="text-[11px] text-slate-500">Issued under Section 31 of the Central Goods & Services Tax Act, 2017</p>
          </div>
          <div className="md:text-right space-y-1">
            <p className="text-lg font-serif font-bold text-white">Chandra &amp; Associates</p>
            <p className="text-[11px] text-slate-400">14, Barakhamba Road, New Delhi — 110001</p>
            <p className="text-[11px] text-slate-400 font-mono">GSTIN: 07AAACC1234A1ZK</p>
            <p className="text-[11px] text-slate-400 font-mono">PAN: AAACC1234A · SAC: 998216</p>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-5 border-b border-slate-800 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Invoice No.</div>
            <div className="mt-1 text-white font-mono">{invoice.invoiceNumber}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Invoice Date</div>
            <div className="mt-1 text-white">{invoice.issueDate}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Due Date</div>
            <div className="mt-1 text-white">{invoice.dueDate}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Place of Supply</div>
            <div className="mt-1 text-white">{isInterState ? "Maharashtra (27)" : "Delhi (07)"}</div>
          </div>
        </div>

        {/* Bill to / Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 border-b border-slate-800 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">Billed To</div>
            <p className="text-white font-semibold text-sm">{client?.companyName || client?.name || "—"}</p>
            {client?.companyName && <p className="text-slate-400">Attn: {client.name}</p>}
            <p className="text-slate-400">{client?.email}</p>
            <p className="text-slate-400">{client?.phone}</p>
            <p className="mt-2 text-slate-500 font-mono text-[11px]">GSTIN: {isInterState ? "27AAACR1234A1Z5" : "07AAAKN0987B1ZP"}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">Matter Reference</div>
            {matter ? (
              <>
                <p className="text-white font-semibold text-sm">{matter.title}</p>
                <p className="text-slate-400 font-mono text-[11px]">{matter.caseNumber}</p>
                {matter.cnr && <p className="text-slate-500 font-mono text-[11px]">CNR: {matter.cnr}</p>}
                <p className="text-slate-400 mt-1">{matter.court}</p>
                <p className="text-slate-500">Lead: {matter.leadCounsel}</p>
              </>
            ) : (
              <p className="text-slate-500">No matter linked</p>
            )}
          </div>
        </div>

        {/* Line items */}
        <div className="py-5 border-b border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  <th className="text-left py-2 pr-3 w-8">#</th>
                  <th className="text-left py-2 pr-3">Description of Service</th>
                  <th className="text-left py-2 pr-3 font-mono">HSN/SAC</th>
                  <th className="text-right py-2 pr-3">Qty</th>
                  <th className="text-right py-2 pr-3">Rate (₹)</th>
                  <th className="text-right py-2">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((li, idx) => (
                  <tr key={idx} className="border-b border-slate-900">
                    <td className="py-3 pr-3 text-slate-500">{idx + 1}</td>
                    <td className="py-3 pr-3 text-slate-200">{li.description}</td>
                    <td className="py-3 pr-3 text-slate-400 font-mono">{li.hsn}</td>
                    <td className="py-3 pr-3 text-right text-slate-300">{li.qty}</td>
                    <td className="py-3 pr-3 text-right text-slate-300 font-mono">{li.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 text-right text-white font-mono font-semibold">{li.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 border-b border-slate-800">
          <div className="text-xs space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Amount in Words</div>
            <p className="text-slate-200 leading-relaxed">{numberToWords(total)}</p>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Taxable value</span>
              <span className="font-mono text-slate-200">{formatCurrency(taxable)}</span>
            </div>

            {isInterState ? (
              <div className="flex justify-between">
                <span className="text-slate-400">IGST @ 18%</span>
                <span className="font-mono text-slate-200">{formatCurrency(igst)}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-400">CGST @ 9%</span>
                  <span className="font-mono text-slate-200">{formatCurrency(cgst)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SGST @ 9%</span>
                  <span className="font-mono text-slate-200">{formatCurrency(sgst)}</span>
                </div>
              </>
            )}

            <div className="pt-2 mt-2 border-t border-slate-800 flex justify-between items-center">
              <span className="text-white font-bold">Grand Total</span>
              <span className="font-mono text-white text-lg font-extrabold">{formatCurrency(total)}</span>
            </div>

            {invoice.amountPaid > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Amount received</span>
                <span className="font-mono">− {formatCurrency(invoice.amountPaid)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-slate-800">
              <span className="text-white">Balance Due</span>
              <span className={`font-mono ${invoice.amountPaid >= total ? "text-emerald-400" : "text-amber-400"}`}>
                {formatCurrency(Math.max(0, total - invoice.amountPaid))}
              </span>
            </div>
          </div>
        </div>

        {/* Payment strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 text-xs">
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-950/20 p-4 md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <QrCode className="w-4 h-4" />
              <span>Pay via UPI</span>
            </div>
            <p className="text-slate-300">
              Scan the QR from any UPI app or send to
              <span className="ml-1 font-mono text-emerald-300">chandra.associates@icici</span>
            </p>
            <p className="text-[10px] text-slate-500">
              Razorpay Payment Link:
              <span className="ml-1 font-mono text-emerald-300">rzp.io/l/inv-{invoice.invoiceNumber.toLowerCase()}</span>
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Bank Transfer (NEFT/RTGS)</span>
            </div>
            <p className="text-slate-400 font-mono text-[11px]">A/C: 0231 XXXX 4471</p>
            <p className="text-slate-400 font-mono text-[11px]">IFSC: ICIC0000023</p>
            <p className="text-slate-500 text-[10px]">ICICI Bank, Barakhamba Rd, New Delhi</p>
          </div>
        </div>

        {/* Footer notes */}
        <div className="pt-5 border-t border-slate-800 space-y-2 text-[10px] text-slate-500 leading-relaxed">
          <p>
            <strong>Declaration:</strong> We hereby certify that the professional services shown here are performed under
            the applicable Bar Council of India rules and that all particulars are true and correct.
          </p>
          <p>
            Whether tax is payable under reverse charge: <strong className="text-slate-400">No</strong> · TDS applicable under
            section 194J of the Income Tax Act, 1961.
          </p>
          <p>Subject to Delhi jurisdiction. E.&amp;O.E.</p>
        </div>
      </div>

      {/* Compact summary card below (for at-a-glance) */}
      <Card
        header={<span className="text-xs font-bold text-white">Ledger Reconciliation</span>}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Issued</p><p className="text-white">{invoice.issueDate}</p></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Due</p><p className="text-white">{invoice.dueDate}</p></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Amount</p><p className="text-white font-mono">{formatCurrency(total)}</p></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Status</p><Badge label={invoice.status} variant={invoice.status === "Paid" ? "success" : invoice.status === "Overdue" ? "error" : "warning"} /></div>
        </div>
      </Card>
    </div>
  );
}
