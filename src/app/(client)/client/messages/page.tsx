"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge, Avatar } from "@/components/ui";
import { Card } from "@/components/cards";
import { MessageSquare, Send, Paperclip, Phone, Video, MoveVertical as MoreVertical, Shield } from "lucide-react";

const initialMessages = [
  {
    id: "m1",
    from: "counsel",
    author: "Harvey Specter",
    role: "Lead Counsel",
    body: "Good afternoon. We've filed the sublicense briefs in Delaware. Let's arrange a prep session before the hearing next week.",
    time: "10:42 AM",
  },
  {
    id: "m2",
    from: "client",
    author: "You",
    role: "Client",
    body: "Thanks Harvey. Does Thursday 2pm work? I'll have the discovery bundle ready by then.",
    time: "11:08 AM",
  },
  {
    id: "m3",
    from: "counsel",
    author: "Harvey Specter",
    role: "Lead Counsel",
    body: "Thursday 2pm works. I'll send a calendar invite. Please review the attached motion draft before we meet.",
    time: "11:15 AM",
  },
];

export default function ClientMessagesPage() {
  const { addToast } = useNotifications();
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: `m${m.length + 1}`, from: "client", author: "You", role: "Client", body: draft, time: "now" },
    ]);
    setDraft("");
    addToast("Message Sent", "Your counsel will respond shortly.", "success");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Messages" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Secure Messages</span>
        </h1>
        <p className="text-xs text-slate-400">Encrypted thread with your assigned counsel. All messages are audit-logged.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thread list */}
        <Card
          header={<div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-400" /><span className="font-bold text-white text-xs">Active Threads</span></div>}
        >
          <div className="space-y-2">
            {[
              { name: "Harvey Specter", role: "Lead Counsel", preview: "Thursday 2pm works. I'll send...", time: "11:15 AM", unread: 0, active: true },
              { name: "Eleanor Vance", role: "Billing Partner", preview: "Invoice INV-2026-014 is ready...", time: "Yesterday", unread: 2, active: false },
              { name: "Donna Paulsen", role: "Paralegal", preview: "Discovery bundle uploaded.", time: "2d ago", unread: 0, active: false },
            ].map((t) => (
              <div
                key={t.name}
                className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  t.active ? "border-indigo-500/40 bg-indigo-600/10" : "border-slate-800 bg-slate-950/40 hover:bg-slate-900/60"
                }`}
              >
                <Avatar name={t.name} size="sm" isOnline={t.active} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{t.name}</span>
                    <span className="text-[9px] text-slate-500 shrink-0">{t.time}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">{t.role}</div>
                  <div className="mt-1 text-[11px] text-slate-400 truncate">{t.preview}</div>
                </div>
                {t.unread > 0 && (
                  <span className="ml-1 shrink-0 h-5 w-5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {t.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Active conversation */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name="Harvey Specter" size="sm" isOnline />
                <div>
                  <div className="text-xs font-bold text-white">Harvey Specter</div>
                  <div className="text-[10px] text-emerald-400">Online · Lead Counsel</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"><Phone className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"><Video className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"><MoreVertical className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          }
        >
          <div className="space-y-3 min-h-[280px] flex flex-col justify-end">
            {messages.map((m) => {
              const isClient = m.from === "client";
              return (
                <div key={m.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                    isClient ? "bg-indigo-600 text-white rounded-br-sm" : "bg-slate-800 text-slate-200 rounded-bl-sm"
                  }`}>
                    <p className="text-xs leading-relaxed">{m.body}</p>
                    <div className={`mt-1 text-[9px] ${isClient ? "text-indigo-200" : "text-slate-500"}`}>{m.author} · {m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-slate-800 pt-3">
            <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"><Paperclip className="w-4 h-4" /></button>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a secure message..."
              className="flex-1 bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-500" onClick={send} rightIcon={<Send className="w-3.5 h-3.5" />}>
              Send
            </Button>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-2.5">
            <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <p className="text-[10px] text-slate-400">Messages are end-to-end encrypted and scoped to your client account.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
