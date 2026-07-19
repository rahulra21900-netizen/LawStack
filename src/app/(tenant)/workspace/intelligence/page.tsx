"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSimulation } from "@/providers/SimulationProvider";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Clock3,
  DatabaseZap,
  FileSearch,
  Link2,
  Mail,
  MessageSquareText,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const lookupSources = [
  {
    title: "New-law precedent: non-solicitation clauses",
    source: "Lexis+ / 2026 update",
    status: "Fresh",
    summary: "Recent rulings favor explicit non-solicitation carveouts and jurisdiction-specific notice language.",
  },
  {
    title: "Legacy authority: 2019 restrictive covenant standard",
    source: "Westlaw archive",
    status: "Reviewed",
    summary: "Older precedent still applies for employment disputes but requires a revised carve-out review.",
  },
  {
    title: "Cross-border enforcement note",
    source: "Internal knowledge base",
    status: "Flagged",
    summary: "Recommended to add a governing-law clause for multi-state matters before filing.",
  },
];

const courtSyncItems = [
  { name: "Superior Court e-filing", status: "Synced 4 mins ago", severity: "good" },
  { name: "Docket alerts", status: "3 new hearing notices", severity: "warning" },
  { name: "Judge calendar feed", status: "Updated 18 mins ago", severity: "good" },
];

const documentCatalog = [
  { name: "Complaint_v4_redline.pdf", type: "OCR ready", tag: "Searchable" },
  { name: "Settlement_worksheet.xlsx", type: "Structured", tag: "Indexed" },
  { name: "Deposition_transcript.txt", type: "Text extracted", tag: "Review" },
];

const outreachChannels = [
  { channel: "Email", status: "9 queued", color: "text-blue-400" },
  { channel: "SMS", status: "2 reminders", color: "text-emerald-400" },
  { channel: "WhatsApp", status: "1 client follow-up", color: "text-purple-400" },
];

const judgeDirectory = [
  { name: "Hon. Sarah Vance", court: "Superior Court", focus: "Complex commercial", next: "Today · 10:00" },
  { name: "Hon. Marcus Hale", court: "District Court", focus: "Employment", next: "Tomorrow · 13:30" },
  { name: "Hon. Lena Ortiz", court: "Family Division", focus: "Custody", next: "Fri · 09:00" },
];

export default function IntelligencePage() {
  const { activeTenant } = useSimulation();
  const [query, setQuery] = useState("non-solicitation");
  const [shareExpiry, setShareExpiry] = useState("24");
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [defectSummary, setDefectSummary] = useState<string | null>(null);

  const visibleLookup = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return lookupSources;

    return lookupSources.filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(normalized));
  }, [query]);

  const runDefectCheck = () => {
    setDefectSummary("3 issues flagged: missing arbitration clause, outdated governing-law reference, and a missing digital-signature notice.");
  };

  const createShareLink = () => {
    setShareLink(`https://share.lawstack.local/oakwood/expiring/${shareExpiry}h`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Intelligence Center" }]} />
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">Intelligence Center</h1>
          <p className="mt-1 text-xs text-slate-400">
            A frontend-only command center for lookup, document review, outreach, and court intelligence for {activeTenant.name}.
          </p>
        </div>
        <Badge label="Prototype workflow suite" variant="info" />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Active auto-checks" value="11" trend="up" change="2 new alerts" info="Compliance review" />
        <MetricCard title="Court sync" value="98%" trend="up" change="Fresh feed" info="Today" />
        <MetricCard title="Expiring shares" value="4" trend="neutral" change="24h max" info="Secure links" />
        <MetricCard title="Outreach queue" value="14" trend="up" change="3 channels" info="Client ops" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white">Old-law / new-law lookup</span>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search precedent or doctrine"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-3 text-xs text-slate-200"
              />
            </div>
            <div className="space-y-2">
              {visibleLookup.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-white">{item.title}</p>
                    <Badge label={item.status} variant="info" />
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">{item.source}</p>
                  <p className="mt-2 text-[11px] text-slate-400">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Automatic defect checker</span>
            </div>
          }
        >
          <div className="space-y-3">
            <textarea
              rows={5}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-200"
              placeholder="Paste a draft agreement or pleading to surface compliance risks."
              defaultValue="Drafted non-compete addendum with missing governing-law language and no explicit digital signature notice."
            />
            <Button variant="primary" onClick={runDefectCheck} leftIcon={<ShieldCheck className="w-4 h-4" />}>
              Run review
            </Button>
            {defectSummary && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-[11px] text-amber-300">
                {defectSummary}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2">
              <DatabaseZap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Court data sync</span>
            </div>
          }
        >
          <div className="space-y-2">
            {courtSyncItems.map((item) => (
              <div key={item.name} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">{item.name}</p>
                  <Badge label={item.severity === "good" ? "Healthy" : "Monitor"} variant={item.severity === "good" ? "success" : "warning"} />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{item.status}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <ScanText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">OCR / searchable documents</span>
            </div>
          }
        >
          <div className="space-y-2">
            {documentCatalog.map((doc) => (
              <div key={doc.name} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-white">{doc.name}</p>
                  <Badge label={doc.tag} variant="info" />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{doc.type}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">Secure expiring sharing</span>
            </div>
          }
        >
          <div className="space-y-3">
            <select
              value={shareExpiry}
              onChange={(e) => setShareExpiry(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-200"
            >
              <option value="4">4 hours</option>
              <option value="24">24 hours</option>
              <option value="72">72 hours</option>
            </select>
            <Button variant="primary" onClick={createShareLink} leftIcon={<Link2 className="w-4 h-4" />}>
              Generate secure link
            </Button>
            {shareLink && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-[10px] text-emerald-300">
                {shareLink}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card
          header={
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white">Multi-channel outreach</span>
            </div>
          }
        >
          <div className="space-y-2">
            {outreachChannels.map((item) => (
              <div key={item.channel} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-2">
                  {item.channel === "Email" ? <Mail className={`w-4 h-4 ${item.color}`} /> : item.channel === "SMS" ? <CalendarClock className={`w-4 h-4 ${item.color}`} /> : <MessageSquareText className={`w-4 h-4 ${item.color}`} />}
                  <span className="text-xs font-semibold text-white">{item.channel}</span>
                </div>
                <span className="text-[10px] text-slate-500">{item.status}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Judge module</span>
            </div>
          }
        >
          <div className="space-y-2">
            {judgeDirectory.map((judge) => (
              <div key={judge.name} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-white">{judge.name}</p>
                  <Badge label="Tracked" variant="info" />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{judge.court} · {judge.focus}</p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock3 className="w-3 h-3" /> {judge.next}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">End-to-end prototype flow</p>
            <p className="mt-1 text-sm text-white">Research precedents, review defects, sync court data, share documents securely, and coordinate client outreach in one place.</p>
          </div>
          <Link href="/workspace/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-white">
            Back to dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
