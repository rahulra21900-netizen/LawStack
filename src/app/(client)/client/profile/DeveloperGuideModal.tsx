"use client";

import React, { useEffect, useRef } from "react";
import { Accessibility, BookOpen, Database, Layout, Route, ShieldCheck, UserRoundCog, Wrench, X } from "lucide-react";

const sections = [
  ["purpose", "1. Purpose & users", BookOpen], ["route", "2. Route & layout", Route],
  ["architecture", "3. Page architecture", Layout], ["data", "4. Data & state", Database],
  ["security", "5. Security flows", ShieldCheck], ["accessibility", "6. Accessibility", Accessibility],
  ["build", "7. Build it for real", Wrench],
] as const;

export function DeveloperGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollRef.current?.scrollTo({ top: 0 });
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const goTo = (id: string) => scrollRef.current?.querySelector<HTMLElement>(`#profile-guide-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="profile-guide-title" data-testid="profile-dev-guide-modal">
    <button aria-label="Close developer guide" className="fixed inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/50">
      <header className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/40 px-5 py-4"><div className="flex min-w-0 items-center gap-3"><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-600/15"><UserRoundCog className="h-4 w-4 text-indigo-400" /></span><div className="min-w-0"><h2 id="profile-guide-title" className="truncate text-sm font-bold text-white sm:text-base">Developer Guide — <span className="font-mono text-indigo-300">/client/profile</span></h2><p className="truncate text-[11px] text-slate-400">Implementation context for client identity, preferences, and account security.</p></div></div><button onClick={onClose} aria-label="Close developer guide" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-4 w-4" /></button></header>
      <div className="flex min-h-0 flex-1"><nav aria-label="Guide sections" className="hidden w-64 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950/20 py-3 md:block"><ul className="space-y-0.5 px-2">{sections.map(([id, label, Icon]) => <li key={id}><button onClick={() => goTo(id)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-white"><Icon className="h-3.5 w-3.5" />{label}</button></li>)}</ul></nav><main ref={scrollRef} className="min-w-0 flex-1 overflow-y-auto px-5 py-6 text-[13px] leading-relaxed text-slate-300 sm:px-8"><Guide /></main></div>
    </div>
  </div>;
}

function H({ id, children }: { id: string; children: React.ReactNode }) { return <h3 id={`profile-guide-${id}`} className="scroll-mt-4 mb-3 mt-8 text-base font-bold text-white first:mt-0">{children}</h3>; }
function P({ children }: { children: React.ReactNode }) { return <p className="mb-3">{children}</p>; }
function Code({ children }: { children: React.ReactNode }) { return <pre className="my-3 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 p-3 font-mono text-[11.5px] leading-relaxed text-slate-300"><code>{children}</code></pre>; }
function I({ children }: { children: React.ReactNode }) { return <code className="rounded border border-slate-700 bg-slate-800/70 px-1.5 py-0.5 font-mono text-[11.5px] text-indigo-200">{children}</code>; }
function List({ children }: { children: React.ReactNode }) { return <ul className="mb-3 list-disc space-y-2 pl-5">{children}</ul>; }

function Guide() { return <article className="max-w-3xl">
  <H id="purpose">1. Purpose &amp; users</H>
  <P><I>/client/profile</I> is the self-service account area for an authenticated client. It presents client identity information, notification choices, and security controls without giving the client access to firm administration or other client records.</P>
  <P>The page reduces support requests for routine account changes while making high-impact security controls clear and deliberate. It also provides a trustworthy, read-only summary of the identity the portal is using.</P>
  <div className="my-3 rounded-lg border border-indigo-500/25 bg-indigo-500/5 p-3 text-[12px] text-indigo-100"><b>Current scope:</b> values and actions are UI scaffolding. The switches only update browser state; save and password actions show toasts. Never treat the visible state as the source of truth.</div>
  <H id="route">2. Route &amp; layout contract</H>
  <Code>{"Route: /client/profile\nPage: src/app/(client)/client/profile/page.tsx\nRoute group: (client), absent from the URL\nLayout: src/app/(client)/layout.tsx\nProvider: NotificationProvider through useNotifications()\nGuide: DeveloperGuideModal.tsx, co-located with this page"}</Code>
  <P>This is a client component because it controls local switch state and button feedback. In production, secure initial data should be fetched on the server and narrowly scoped client components should own only interactive controls.</P>
  <H id="architecture">3. Page architecture</H>
  <Code>{"ClientProfilePage\n├─ Header: breadcrumb, title, description, Developer Guide\n└─ Responsive grid (one column; three columns at lg)\n   ├─ Client Identity card (one column)\n   │  └─ initials, name, client tier/status, email, phone, entity\n   └─ Preferences & Security area (two columns)\n      ├─ Notification Preferences card: email-alert switch + Save button\n      └─ Security card: MFA switch + password-change inputs/action"}</Code>
  <P>Use shared <I>Card</I>, <I>Breadcrumb</I>, <I>Badge</I>, <I>Button</I>, <I>Input</I>, and <I>Switch</I> components. The identity card is informational; preference and security controls are state-changing and must have loading, success, and failure feedback when wired to APIs.</P>
  <H id="data">4. Data &amp; state</H>
  <P>The current state is <I>twoFactor</I> and <I>emailAlerts</I>. These values drive the Switch components but reset on refresh because they are not persisted. Identity details, labels, and badge values are presently static display data.</P>
  <Code>{"type ClientProfile = {\n  id: string; tenantId: string; name: string; email: string; phone?: string;\n  entityName?: string; status: \"active\" | \"suspended\"; kycStatus: string;\n  preferences: { emailAlerts: boolean }; security: { mfaEnabled: boolean };\n};"}</Code>
  <P>Do not expose sensitive fields such as password hashes, MFA recovery codes, full audit data, or internal risk flags. The server must return only the current user&apos;s permitted profile view.</P>
  <H id="security">5. Security flows &amp; component behaviour</H>
  <List><li><b>Notification preferences:</b> update only the selected preference for the authenticated account. Persist an explicit revision/audit event and handle concurrent edits safely.</li><li><b>MFA switch:</b> do not toggle a boolean directly in production. Enabling should start an enrollment ceremony (for example TOTP/WebAuthn), verify it, then persist. Disabling should require re-authentication and possibly a second factor.</li><li><b>Password fields:</b> keep values in local state only long enough to submit over TLS. Never preload, log, toast, or store them in browser persistence. Validate server-side; require current password or step-up auth where policy requires it.</li><li><b>Identity card:</b> should read from the authenticated client profile, not route parameters or browser storage. KYC and status badges must reflect authoritative service data.</li><li><b>Feedback:</b> disable controls during a request, show actionable inline errors, announce success, and refresh server data after mutations.</li></List>
  <H id="accessibility">6. Accessibility checklist</H>
  <List><li>Associate every password input with a visible label; placeholders alone are not labels.</li><li>Ensure Switch has an accessible name and state, and make its purpose clear without color.</li><li>Place validation text beside the relevant field and connect it with aria-describedby.</li><li>Preserve keyboard focus on the control that triggered a save, then announce the result through a status region.</li><li>Icon-only controls in any future edit/upload experience require descriptive aria-labels and visible focus states.</li></List>
  <H id="build">7. Build it for real</H>
  <P>Separate server data loading from interactive forms. Use dedicated components such as <I>ProfileIdentityCard</I>, <I>NotificationPreferencesForm</I>, <I>MfaSettings</I>, and <I>ChangePasswordForm</I>. This keeps sensitive actions small, testable, and independently authorized.</P>
  <Code>{"GET   /api/client/profile\nPATCH /api/client/profile/preferences\nPOST  /api/client/profile/mfa/enrollment\nPOST  /api/client/profile/mfa/verify\nDELETE /api/client/profile/mfa\nPOST  /api/client/profile/password"}</Code>
  <P>Use server-side session identity for every endpoint, rate-limit password/MFA operations, audit every security change, invalidate other sessions after password rotation where policy requires it, and add tests for authorization isolation, invalid passwords, expired MFA challenges, retry behaviour, keyboard operation, and error disclosure.</P>
</article>; }
