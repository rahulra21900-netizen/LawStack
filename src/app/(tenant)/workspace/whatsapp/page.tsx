"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Badge, Button, Avatar } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import {
  MessageCircle,
  ShieldCheck,
  Send,
  Search,
  CheckCheck,
  Clock,
  FileText,
  Sparkles,
  Users,
  BellRing,
  BookMarked,
  Info,
  UserPlus,
} from "lucide-react";

const templates = [
  {
    id: "hearing-reminder",
    name: "Hearing Reminder",
    category: "UTILITY",
    approvedOn: "2025-11-14",
    body:
      "Namaste {{1}}, this is Chandra & Associates. Your hearing in {{2}} is scheduled for {{3}} at {{4}}. Kindly reach 30 minutes early. — Adv. {{5}}",
    variables: ["client_name", "case_title", "date", "court_hall", "lead_counsel"],
    lastUsed: "3 hours ago",
    sends: 214,
  },
  {
    id: "status-update",
    name: "Case Status Update",
    category: "UTILITY",
    approvedOn: "2025-11-14",
    body:
      "Update on your matter {{1}}: {{2}}. The next hearing is {{3}}. You may view full details in the client portal.",
    variables: ["case_title", "order_summary", "next_hearing"],
    lastUsed: "Yesterday",
    sends: 98,
  },
  {
    id: "invoice-payment",
    name: "Invoice Payment Request",
    category: "UTILITY",
    approvedOn: "2026-01-04",
    body:
      "Dear {{1}}, invoice {{2}} for {{3}} is due on {{4}}. Please pay via UPI to chandra.associates@icici or use the Razorpay link. — Chandra & Associates",
    variables: ["client_name", "invoice_number", "amount", "due_date"],
    lastUsed: "5 days ago",
    sends: 46,
  },
  {
    id: "adjournment",
    name: "Adjournment Notice",
    category: "UTILITY",
    approvedOn: "2025-12-02",
    body:
      "The hearing in {{1}} originally scheduled on {{2}} has been adjourned to {{3}}. We will keep you informed.",
    variables: ["case_title", "old_date", "new_date"],
    lastUsed: "2 weeks ago",
    sends: 31,
  },
];

const conversations = [
  {
    id: "conv-sharma",
    name: "Rakesh Sharma",
    phone: "+91 98110 44321",
    matter: "CRLM.A. 4382/2026",
    preview: "Understood. I will reach Delhi HC by 10 am tomorrow.",
    time: "12 min ago",
    unread: 0,
    lastDirection: "in",
    online: true,
    optIn: true,
  },
  {
    id: "conv-reliance",
    name: "Anjali Nair",
    phone: "+91 22 6555 1200",
    matter: "CS(COMM) 942/2026",
    preview: "Sent the affidavit draft for your review.",
    time: "1 h ago",
    unread: 2,
    lastDirection: "out",
    online: false,
    optIn: true,
  },
  {
    id: "conv-krishna",
    name: "Suresh Krishnan",
    phone: "+91 98450 21109",
    matter: "ITA 331/2026",
    preview: "Please share invoice PDF once ready.",
    time: "Yesterday",
    unread: 1,
    lastDirection: "in",
    online: false,
    optIn: true,
  },
  {
    id: "conv-durga",
    name: "Durga Prasad",
    phone: "+91 90000 44112",
    matter: "CC/2026/0742",
    preview: "Awaiting opt-in confirmation.",
    time: "3 days ago",
    unread: 0,
    lastDirection: "out",
    online: false,
    optIn: false,
  },
];

const complianceItems = [
  { label: "Business account status", value: "Verified", tone: "success" },
  { label: "24-hour session window", value: "Compliant", tone: "success" },
  { label: "Opt-in capture flow", value: "Digital + Signed", tone: "success" },
  { label: "BCI Rule 36 (no solicitation)", value: "Client-initiated only", tone: "success" },
];

export default function WhatsAppHub() {
  const { addToast } = useNotifications();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedConv, setSelectedConv] = useState<typeof conversations[number]>(conversations[0]);
  const [query, setQuery] = useState("");

  const filtered = conversations.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query)
  );

  return (
    <div className="space-y-6" data-testid="whatsapp-hub">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
        <div>
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "WhatsApp Hub" }]} />
          <h1 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/15 border border-emerald-500/30">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </span>
            <span>WhatsApp Business Hub</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Unified WhatsApp Business API workspace — approved templates, client conversations, opt-in ledger, and BCI Rule 36-compliant broadcasts.
            <span className="text-slate-500"> No personal accounts. No public directory listing.</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="Meta Business Verified" variant="success" />
          <Button variant="primary" leftIcon={<Send className="w-4 h-4" />} onClick={() => addToast("Broadcast queued", "3 approved templates scheduled to opted-in clients.", "success")}>
            New broadcast
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Approved templates" value={templates.length} info="Meta-reviewed" trend="up" change="+1 this month" />
        <MetricCard title="Opted-in clients" value="42" info="Digital consent" trend="up" change="+6 this week" />
        <MetricCard title="Messages (30d)" value="1,284" info="Delivered" trend="up" change="+18%" />
        <MetricCard title="Read-rate" value="94%" info="Compliant" trend="up" change="+2.1%" />
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Conversations column */}
        <Card
          className="xl:col-span-1"
          header={
            <div className="flex items-center justify-between w-full gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> Live Conversations</span>
              <button
                className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20"
                onClick={() => addToast("Invite sent", "Digital opt-in request sent via SMS with a WhatsApp deep link.", "info")}
                data-testid="whatsapp-invite-client-btn"
              >
                <UserPlus className="w-3 h-3 inline mr-1" /> Invite client
              </button>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by client or phone…"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/40"
                data-testid="whatsapp-search-input"
              />
            </div>

            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {filtered.map((c) => {
                const active = c.id === selectedConv.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConv(c)}
                    className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors ${
                      active
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                    data-testid={`whatsapp-conv-${c.id}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <Avatar name={c.name} size="sm" />
                        {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white truncate">{c.name}</span>
                          <span className="text-[10px] text-slate-500 shrink-0">{c.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-slate-500 font-mono truncate">{c.phone}</span>
                          {!c.optIn && <Badge label="No opt-in" variant="warning" size="sm" />}
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-1">
                          <p className="text-[11px] text-slate-400 truncate flex-1">
                            {c.lastDirection === "out" ? <CheckCheck className="w-3 h-3 inline text-emerald-400 mr-1" /> : null}
                            {c.preview}
                          </p>
                          {c.unread > 0 && (
                            <span className="text-[9px] bg-emerald-500 text-slate-950 font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center shrink-0">
                              {c.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Conversation detail */}
        <Card
          className="xl:col-span-2"
          header={
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <Avatar name={selectedConv.name} size="sm" />
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{selectedConv.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{selectedConv.phone} · {selectedConv.matter}</p>
                </div>
              </div>
              {selectedConv.optIn ? (
                <Badge label="Opted in · 24h window active" variant="success" size="sm" />
              ) : (
                <Badge label="Awaiting opt-in" variant="warning" size="sm" />
              )}
            </div>
          }
        >
          {/* Message thread mock */}
          <div className="space-y-2 min-h-[260px] max-h-[320px] overflow-y-auto pr-1 py-1">
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-slate-800/70 px-3 py-2 text-[11px] text-slate-200">
                Namaste sir, kal ki hearing ka kya update hai?
                <div className="mt-1 text-[9px] text-slate-500">10:22 AM</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-emerald-600/25 border border-emerald-500/30 px-3 py-2 text-[11px] text-slate-100">
                Namaste. Anticipatory bail arguments have been scheduled for tomorrow at 10:30 AM in Delhi HC, Court No. 24.
                Please reach 30 minutes early.
                <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-500 justify-end">
                  10:24 AM <CheckCheck className="w-2.5 h-2.5 text-emerald-300" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-emerald-600/25 border border-emerald-500/30 px-3 py-2 text-[11px] text-slate-100">
                (Template sent: Hearing Reminder v2.1)
                <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-500 justify-end">
                  10:24 AM <CheckCheck className="w-2.5 h-2.5 text-emerald-300" />
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-slate-800/70 px-3 py-2 text-[11px] text-slate-200">
                Understood. I will reach Delhi HC by 10 am tomorrow.
                <div className="mt-1 text-[9px] text-slate-500">10:29 AM</div>
              </div>
            </div>
          </div>

          {/* Compose */}
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-2.5">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Send an approved template</span>
              <span className="ml-auto text-[9px] font-mono text-slate-500">Session ends in 23h 41m</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`text-[10px] px-2 py-1 rounded border transition-colors ${
                    selectedTemplate.id === t.id
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                  data-testid={`whatsapp-template-${t.id}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-[11px] text-slate-300 leading-relaxed">
              {selectedTemplate.body}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">Variables: {selectedTemplate.variables.join(", ")}</span>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() =>
                  addToast(
                    "Template dispatched",
                    `Sent "${selectedTemplate.name}" to ${selectedConv.name}. Delivery status will update in seconds.`,
                    "success"
                  )
                }
                data-testid="whatsapp-send-template-btn"
              >
                Send template
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Template gallery + Compliance */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card
          className="xl:col-span-2"
          header={<span className="text-xs font-bold text-white flex items-center gap-1.5"><BookMarked className="w-4 h-4 text-emerald-400" /> Approved Template Library</span>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map((t) => (
              <div key={t.id} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-white">{t.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">{t.category} · Approved {t.approvedOn}</p>
                  </div>
                  <Badge label={`${t.sends} sends`} variant="info" size="sm" />
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">{t.body}</p>
                <div className="flex items-center justify-between text-[9px] text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last used {t.lastUsed}</span>
                  <button
                    className="text-emerald-400 hover:text-emerald-300 font-semibold uppercase tracking-wider"
                    onClick={() => addToast("Template loaded", `${t.name} ready to compose.`, "info")}
                    data-testid={`whatsapp-use-template-${t.id}`}
                  >
                    Use →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card header={<span className="text-xs font-bold text-white flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-400" /> Compliance Ledger</span>}>
          <div className="space-y-2">
            {complianceItems.map((c) => (
              <div key={c.label} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs">
                <span className="text-slate-300">{c.label}</span>
                <Badge label={c.value} variant="success" size="sm" />
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-200 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
              <Info className="w-3.5 h-3.5" /> BCI Rule 36 reminder
            </div>
            All outreach must be <strong>client-initiated</strong> or <strong>explicitly opted-in</strong>. Cold advertising via WhatsApp is not permitted.
          </div>

          <Link
            href="/workspace/settings"
            className="mt-3 inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 font-semibold"
          >
            <BellRing className="w-3 h-3" /> Manage opt-in flow
          </Link>
        </Card>
      </div>
    </div>
  );
}
