"use client";

import React, { useEffect, useRef } from "react";
import { Accessibility, BookOpen, Database, Layout, MessageSquare, Route, ShieldCheck, Wrench, X } from "lucide-react";

const sections = [
  ["purpose", "1. Purpose & users", BookOpen], ["route", "2. Route & layout", Route],
  ["architecture", "3. Page architecture", Layout], ["data", "4. Data & state", Database],
  ["interactions", "5. Interactions", MessageSquare], ["security", "6. Security & privacy", ShieldCheck],
  ["accessibility", "7. Accessibility", Accessibility], ["build", "8. Build it for real", Wrench],
] as const;

export function DeveloperGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollRef.current?.scrollTo({ top: 0 });
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = previousOverflow; };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const goTo = (id: string) => scrollRef.current?.querySelector<HTMLElement>(`#messages-guide-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="messages-guide-title" data-testid="messages-dev-guide-modal">
    <button aria-label="Close developer guide" className="fixed inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/50">
      <header className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/40 px-5 py-4"><div className="flex min-w-0 items-center gap-3"><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-600/15"><BookOpen className="h-4 w-4 text-indigo-400" /></span><div className="min-w-0"><h2 id="messages-guide-title" className="truncate text-sm font-bold text-white sm:text-base">Developer Guide — <span className="font-mono text-indigo-300">/client/messages</span></h2><p className="truncate text-[11px] text-slate-400">Implementation context for secure client messaging.</p></div></div><button onClick={onClose} aria-label="Close developer guide" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-4 w-4" /></button></header>
      <div className="flex min-h-0 flex-1"><nav aria-label="Guide sections" className="hidden w-64 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950/20 py-3 md:block"><ul className="space-y-0.5 px-2">{sections.map(([id, label, Icon]) => <li key={id}><button onClick={() => goTo(id)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-white"><Icon className="h-3.5 w-3.5" />{label}</button></li>)}</ul></nav><main ref={scrollRef} className="min-w-0 flex-1 overflow-y-auto px-5 py-6 text-[13px] leading-relaxed text-slate-300 sm:px-8"><Guide /></main></div>
    </div>
  </div>;
}

function H({ id, children }: { id: string; children: React.ReactNode }) { return <h3 id={`messages-guide-${id}`} className="scroll-mt-4 mb-3 mt-8 text-base font-bold text-white first:mt-0">{children}</h3>; }
function P({ children }: { children: React.ReactNode }) { return <p className="mb-3">{children}</p>; }
function Code({ children }: { children: React.ReactNode }) { return <pre className="my-3 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-[11.5px] leading-relaxed text-slate-300"><code>{children}</code></pre>; }
function I({ children }: { children: React.ReactNode }) { return <code className="rounded border border-slate-700 bg-slate-800/70 px-1.5 py-0.5 font-mono text-[11.5px] text-indigo-200">{children}</code>; }
function List({ children }: { children: React.ReactNode }) { return <ul className="mb-3 list-disc space-y-2 pl-5">{children}</ul>; }

function Guide() { return <article className="max-w-3xl">
  <H id="purpose">1. Purpose &amp; users</H>
  <P><I>/client/messages</I> is the client portal&apos;s communication surface. It gives a client one focused place to read and send messages to their assigned legal team without exposing internal firm conversations, other accounts, or case-management controls.</P>
  <P>Legal work needs a traceable alternative to scattered email and informal chat. The page is designed to make the current conversation obvious, make replies quick, and reinforce the security boundary.</P>
  <div className="my-3 rounded-lg border border-indigo-500/25 bg-indigo-500/5 p-3 text-[12px] text-indigo-100"><b>Current scope:</b> this page is a client-side prototype. Sending adds a local message and shows a toast. Thread switching, attachments, calling, encryption, and audit persistence are visual contracts that must be connected to real services.</div>
  <H id="route">2. Route &amp; layout contract</H>
  <Code>{"Route: /client/messages\nPage: src/app/(client)/client/messages/page.tsx\nRoute group: (client), which does not appear in the URL\nLayout: src/app/(client)/layout.tsx\nProvider: NotificationProvider through useNotifications()\nGuide: DeveloperGuideModal.tsx, co-located with this page"}</Code>
  <P>The page is a client component because it owns the draft input and visible message list. The parent layout supplies navigation, framing, and notification-provider scope.</P>
  <H id="architecture">3. Page architecture</H>
  <Code>{"ClientMessagesPage\n├─ Header: breadcrumb, title, security promise, Developer Guide\n└─ Responsive grid (one column; three columns at lg)\n   ├─ Thread list card: avatars, role, preview, timestamp, unread badge\n   └─ Active conversation card: header, bubbles, composer, security notice"}</Code>
  <P>Shared <I>Breadcrumb</I>, <I>Button</I>, <I>Avatar</I>, and <I>Card</I> components provide the portal&apos;s visual language. Indigo identifies messaging; client bubbles are indigo/right-aligned, counsel bubbles slate/left-aligned. Preserve this directional distinction when rebuilding.</P>
  <H id="data">4. Data &amp; state</H>
  <P><I>initialMessages</I> seeds the active conversation. <I>messages</I> holds its visible history and <I>draft</I> controls the composer. A message needs an ID, sender kind, author, role, body, and timestamp.</P>
  <Code>{'type Message = { id: string; from: "client" | "counsel"; author: string; role: string; body: string; time: string; };'}</Code>
  <P>Thread rows are currently hard-coded separately from the message list. A production implementation should derive preview, unread count, participant, timestamp, and selected state from a shared thread query so the panels cannot drift apart.</P>
  <H id="interactions">5. Interactions &amp; behaviour</H>
  <List><li><b>Developer Guide:</b> opens this modal. Escape, backdrop click, and the close button dismiss it; opening locks body scroll.</li><li><b>Thread rows:</b> look interactive but do not yet switch conversations. Add <I>activeThreadId</I>, load its messages, and mark it read.</li><li><b>Composer:</b> is controlled by <I>draft</I>. Enter calls <I>send()</I>; blank text is ignored; a local send appends a client bubble, clears the input, and shows a toast.</li><li><b>Attachment, call, video, and more:</b> are placeholders. Connect them to approved services and provide aria-labels, tooltips, and unavailable states.</li><li><b>Presence and unread counts:</b> are sample values; treat them as permission-scoped, server-backed, potentially real-time data.</li></List>
  <H id="security">6. Security &amp; privacy requirements</H>
  <P>“Encrypted” and “audit-logged” are product promises, not styling. Authorization and audit logging must be enforced by the API, never by browser state.</P>
  <List><li>Derive tenant and client identity from the authenticated server session; never trust a browser-supplied client ID.</li><li>Authorize every thread/message read and write against tenant, client, participant, and matter membership.</li><li>Record immutable audit events for reads, sends, attachments, membership changes, and administrative access.</li><li>Encrypt data in transit and at rest. If end-to-end encryption is literal, design key ownership, recovery, search, retention, and attachment handling before claiming it.</li><li>Validate and scan attachments server-side; use authorized short-lived download URLs and never render untrusted HTML.</li></List>
  <H id="accessibility">7. Accessibility checklist</H>
  <List><li>Use real buttons and descriptive aria-labels for every icon-only control.</li><li>Maintain a visible keyboard focus state and logical tab order: threads, actions, history, composer.</li><li>Use a restrained aria-live region for incoming messages; do not re-announce the full history.</li><li>Do not use color alone for sender, unread, delivery, or security status.</li><li>On thread change, expose a clear active-conversation heading and intentionally manage scroll/focus.</li></List>
  <H id="build">8. Build it for real</H>
  <P>As data becomes real, split server loading from client interaction: a server <I>page.tsx</I> authenticates and fetches initial data; a client <I>MessagesView</I> owns selection, composer state, optimistic sends, and realtime subscriptions. Extract ThreadList, Conversation, MessageComposer, and types into focused modules.</P>
  <Code>{"GET  /api/client/message-threads?cursor=…\nGET  /api/client/message-threads/:threadId/messages?cursor=…\nPOST /api/client/message-threads/:threadId/messages\nPOST /api/client/message-threads/:threadId/read\nPOST /api/client/message-threads/:threadId/attachments"}</Code>
  <P>Use cursor pagination, optimistic sends with retry/error UI, idempotency keys, and WebSocket or server-sent-events updates. Test authorization isolation, blank drafts, long messages, network failure, reconnects, attachment rejection, keyboard use, and screen-reader announcements before release.</P>
</article>; }
