"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BellRing,
  Briefcase,
  ChevronRight,
  ClipboardList,
  Gavel,
  Mic,
  MicOff,
  Radio,
  Scale,
  ShieldAlert,
  Signal,
  Sparkles,
  Timer,
  WifiOff,
} from "lucide-react";

/**
 * Court Mode — mobile-first, offline-friendly companion for advocates in courtrooms.
 * Public route (no auth wall). Designed for a phone in portrait, but graceful on desktop.
 */

const causeList = [
  {
    id: "cl-1",
    caseTitle: "State v. Rakesh Sharma",
    caseNumber: "CRLM.A. 4382/2026",
    court: "Delhi HC · Court No. 24",
    hearingType: "Anticipatory Bail Arguments",
    time: "10:30",
    status: "next", // next, upcoming, done, adjourned
    minutesAway: 42,
    seniorRequired: true,
    section: "BNSS §482",
  },
  {
    id: "cl-2",
    caseTitle: "Reliance Retail v. QuickCart",
    caseNumber: "CS(COMM) 942/2026",
    court: "Delhi HC · Court No. 8 (IP Div)",
    hearingType: "Interim Injunction",
    time: "11:45",
    status: "upcoming",
    minutesAway: 117,
    seniorRequired: false,
    section: "Trade Marks Act §29(4)",
  },
  {
    id: "cl-3",
    caseTitle: "Durga Prasad v. Nova Motors India",
    caseNumber: "CC/2026/0742",
    court: "State Consumer Commission, Lucknow",
    hearingType: "Evidence Framing",
    time: "14:15",
    status: "upcoming",
    minutesAway: 267,
    seniorRequired: false,
    section: "Consumer Protection Act §35",
  },
  {
    id: "cl-0",
    caseTitle: "In re Oakwood Estates",
    caseNumber: "CP(CAA) 118/2026",
    court: "NCLT Mumbai",
    hearingType: "Scheme approval",
    time: "09:15",
    status: "adjourned",
    minutesAway: -30,
    seniorRequired: false,
    section: "Companies Act §230",
  },
];

const quickNotes = [
  { id: "qn-1", time: "09:52", text: "Opposing counsel arrived; carrying additional affidavit — request certified copy." },
  { id: "qn-2", time: "09:48", text: "Bench in a good mood — Justice Kumar mentioned Sibbia precedent voluntarily." },
];

const statusColor: Record<string, string> = {
  next: "border-amber-500/60 bg-amber-500/10",
  upcoming: "border-slate-800 bg-slate-950/60",
  done: "border-emerald-500/40 bg-emerald-500/5 opacity-70",
  adjourned: "border-red-500/40 bg-red-500/10",
};

const statusChip: Record<string, string> = {
  next: "bg-amber-500 text-slate-950",
  upcoming: "bg-slate-800 text-slate-300",
  done: "bg-emerald-500/20 text-emerald-300",
  adjourned: "bg-red-500/20 text-red-300",
};

export default function CourtMode() {
  const [now, setNow] = useState<string>("--:--");
  const [isOnline, setIsOnline] = useState(true);
  const [recording, setRecording] = useState(false);
  const [notes, setNotes] = useState(quickNotes);
  const [clashOpen, setClashOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const nextHearing = useMemo(() => causeList.find((c) => c.status === "next"), []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const addNote = (text: string) => {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
    setNotes((prev) => [{ id: `qn-${Date.now()}`, time, text }, ...prev]);
  };

  const stopRecording = () => {
    if (seconds > 0) {
      addNote(`Voice memo captured (${mm}:${ss}). Auto-transcript pending sync.`);
    }
    setRecording(false);
    setSeconds(0);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <Link href="/workspace/dashboard" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white" data-testid="court-mode-back">
          <ArrowLeft className="w-3.5 h-3.5" />
          Exit Court Mode
        </Link>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="font-mono font-bold text-white text-sm tabular-nums">{now}</span>
          <button
            onClick={() => setIsOnline((v) => !v)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${
              isOnline
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-slate-700 bg-slate-900 text-slate-400"
            }`}
            title="Toggle simulated connectivity"
            data-testid="court-mode-connectivity-toggle"
          >
            {isOnline ? <Signal className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
            {isOnline ? "Live" : "Offline"}
          </button>
        </div>
      </header>

      {/* Mobile-shaped canvas centered on desktop */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-md px-4 py-4 space-y-4">
          {/* Hero: next hearing countdown */}
          {nextHearing && (
            <section
              className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/60 via-slate-950 to-slate-950 p-5 shadow-xl shadow-amber-900/20"
              data-testid="court-mode-next-hearing"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold text-amber-300 uppercase tracking-[0.2em]">
                <Gavel className="w-3.5 h-3.5" />
                Up Next
              </div>

              <h1 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight">
                {nextHearing.caseTitle}
              </h1>
              <p className="mt-1 text-[11px] font-mono text-slate-400">{nextHearing.caseNumber} · CNR live</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">In</div>
                  <div className="mt-1 text-3xl font-extrabold tabular-nums text-amber-300">{nextHearing.minutesAway}<span className="text-sm text-slate-400 ml-1">min</span></div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Court</div>
                  <div className="mt-1 text-xs font-semibold text-white leading-tight">{nextHearing.court}</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 col-span-2">
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Purpose</div>
                  <div className="mt-0.5 text-sm text-white">{nextHearing.hearingType}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">{nextHearing.section}</div>
                </div>
              </div>

              {/* Big red clash button */}
              <button
                onClick={() => setClashOpen(true)}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 border border-red-400/40 active:scale-[0.98] transition-transform"
                data-testid="court-mode-clash-btn"
              >
                <ShieldAlert className="w-4 h-4" />
                Flag Clash / Escalate Bench
              </button>
            </section>
          )}

          {/* Voice memo capture */}
          <section
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/40"
            data-testid="court-mode-voice-memo"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              Voice Memo
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">
                  {recording ? "Recording…" : "Tap to capture note"}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Auto-transcribed &amp; attached to the active matter
                </div>
              </div>
              <button
                onClick={() => (recording ? stopRecording() : setRecording(true))}
                className={`w-14 h-14 rounded-full inline-flex items-center justify-center border-2 transition-all active:scale-95 ${
                  recording
                    ? "bg-red-600 border-red-300 shadow-lg shadow-red-900/40 animate-pulse"
                    : "bg-emerald-600 border-emerald-300 shadow-lg shadow-emerald-900/40"
                }`}
                data-testid="court-mode-record-btn"
                aria-label={recording ? "Stop recording" : "Start recording"}
              >
                {recording ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
              </button>
            </div>

            {recording && (
              <div className="mt-3 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-mono">
                <span className="text-red-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  REC
                </span>
                <span className="text-white tabular-nums">{mm}:{ss}</span>
              </div>
            )}
          </section>

          {/* Cause list */}
          <section
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
            data-testid="court-mode-cause-list"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <ClipboardList className="w-3.5 h-3.5 text-blue-400" />
                Today's Cause List
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                {isOnline ? "Synced 30s ago" : "Cached · will sync when online"}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {causeList.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-2xl border p-3 ${statusColor[c.status]} transition-colors`}
                  data-testid={`court-mode-cause-${c.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-white tabular-nums">{c.time}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${statusChip[c.status]}`}>
                          {c.status}
                        </span>
                        {c.seniorRequired && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/25">
                            Senior
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white leading-tight truncate">{c.caseTitle}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{c.caseNumber}</p>
                      <p className="text-[10px] text-slate-500 truncate">{c.court}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live notes feed */}
          <section
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
            data-testid="court-mode-live-notes"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Live Notes
              </div>
              <button
                onClick={() => addNote("Quick tag: bench observation logged.")}
                className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider"
                data-testid="court-mode-add-note-btn"
              >
                + Quick tag
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {notes.length === 0 && (
                <p className="text-[11px] text-slate-500 italic">No live notes yet. Tap the mic or add a quick tag.</p>
              )}
              {notes.map((n) => (
                <div key={n.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{n.time}</span>
                  <p className="text-[12px] text-slate-200 leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer meta */}
          <div className="pb-4 pt-2 text-center text-[9px] font-mono uppercase tracking-wider text-slate-600">
            LawStack Court Mode · Optimised for court corridors on 4G
          </div>
        </div>
      </div>

      {/* Clash confirmation sheet */}
      {clashOpen && (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm" onClick={() => setClashOpen(false)}>
          <div
            className="w-full max-w-md rounded-t-3xl border-t border-l border-r border-slate-800 bg-slate-950 p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
            data-testid="court-mode-clash-sheet"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-slate-800" />
            <div className="flex items-center gap-2 text-red-400">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Escalate this matter</span>
            </div>
            <p className="text-xs text-slate-300">
              Notify Adv. <strong>Priya Chandra</strong> and Adv. <strong>Rohan Deshpande</strong> that senior support is
              required at <strong>Delhi HC · Court No. 24</strong> in the next 45 minutes.
            </p>

            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <button className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-2 py-2 text-blue-300 font-bold uppercase tracking-wider" data-testid="court-mode-clash-whatsapp">WhatsApp</button>
              <button className="rounded-xl border border-slate-800 bg-slate-900 px-2 py-2 text-slate-300 font-bold uppercase tracking-wider" data-testid="court-mode-clash-sms">SMS</button>
              <button className="rounded-xl border border-slate-800 bg-slate-900 px-2 py-2 text-slate-300 font-bold uppercase tracking-wider" data-testid="court-mode-clash-call">Call</button>
            </div>

            <button
              onClick={() => setClashOpen(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 text-sm font-bold text-white active:scale-[0.98]"
              data-testid="court-mode-clash-confirm"
            >
              Dispatch Escalation
            </button>
            <button
              onClick={() => setClashOpen(false)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
