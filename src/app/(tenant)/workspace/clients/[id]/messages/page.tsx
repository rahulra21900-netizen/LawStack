"use client";

import React, { useState } from "react";
import { Card } from "@/components/cards";
import { Badge, Button } from "@/components/ui";
import { MOCK_CLIENTS } from "@/mocks/clients";
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  Share2,
  FileText,
  DollarSign,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export default function ClientDirectMessagingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const { addToast } = useNotifications();
  const clientData = MOCK_CLIENTS.find((c) => c.id === id);

  const [messageInput, setMessageInput] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: "Harvey Specter (Lead Attorney)",
      text: "Hello, we have received the updated counter-affidavit from opposing counsel. Please review the attached draft.",
      time: "Yesterday · 04:30 PM",
      channel: "Client Portal & Email",
      isInternal: true,
    },
    {
      id: "m2",
      sender: clientData?.name || "Client",
      text: "Thank you, Mr. Specter. Does this require my signature on the Vakalatnama before Friday?",
      time: "Today · 10:15 AM",
      channel: "Client Portal",
      isInternal: false,
    },
  ]);

  if (!clientData) return null;

  const inviteUrl = `https://portal.lawstack.local/invite/${clientData.id}-bci2026`;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "Harvey Specter (Lead Attorney)",
      text: messageInput,
      time: "Just now",
      channel: "Client Portal & WhatsApp",
      isInternal: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessageInput("");
    addToast("Update Sent", `Direct portal & WhatsApp message dispatched to ${clientData.name}.`, "success");
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    addToast("Invite Link Copied", "BCI Rule 36 compliant single-use client portal link copied.", "info");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleQuickTemplate = (templateText: string) => {
    setMessageInput(templateText);
  };

  return (
    <div className="space-y-6">
      {/* Top BCI Rule 36 Closed-Network Control Banner */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <span>Closed-Network Client Portal Communication Console</span>
              <Badge variant="success" size="sm">BCI Rule 36 Compliant</Badge>
            </h2>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Direct, private engagement channel for firm staff with <strong>{clientData.name}</strong>. No public directory or soliciting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyInvite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-900/30"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Copied Invite!" : "Copy Closed Portal Invite"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Messenger Box */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white text-xs">Direct Attorney-Client Messaging Channel</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Status: Connected</span>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Messages Stream */}
            <div className="space-y-3 max-h-[350px] overflow-y-auto p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl max-w-[85%] text-xs space-y-1 ${
                    m.isInternal
                      ? "ml-auto bg-blue-600/20 border border-blue-500/30 text-blue-100"
                      : "mr-auto bg-slate-900 border border-slate-800 text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] font-semibold text-slate-400">
                    <span>{m.sender}</span>
                    <span className="font-mono text-[9px] text-slate-500">{m.time}</span>
                  </div>
                  <p className="text-xs text-white leading-relaxed">{m.text}</p>
                  <div className="text-[9px] text-slate-400 text-right font-mono">{m.channel}</div>
                </div>
              ))}
            </div>

            {/* Quick Template Fillers */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="font-bold uppercase tracking-wider text-slate-500 mr-1">Quick Updates:</span>
              <button
                onClick={() => handleQuickTemplate("Next hearing date scheduled for 18th Aug at 10:30 AM before High Court Bench.")}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                📅 Hearing Date Update
              </button>
              <button
                onClick={() => handleQuickTemplate("Vakalatnama authorization form requires your digital signature. Link attached.")}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                ✍️ Request Signature
              </button>
              <button
                onClick={() => handleQuickTemplate("Invoice #INV-2026-004 generated for fee retainer. UPI / Razorpay link available.")}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                💳 Payment Reminder
              </button>
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Type direct message or case update for ${clientData.name}...`}
                className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" variant="primary" leftIcon={<Send className="w-3.5 h-3.5" />}>
                Send Update
              </Button>
            </form>
          </div>
        </Card>

        {/* Right Panel: Outreach Channels & Quick Dispatch */}
        <div className="space-y-4">
          <Card
            header={
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Outreach Dispatch Channels</span>
              </div>
            }
          >
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="font-bold text-white">Email Digest</p>
                    <p className="text-[10px] text-slate-400">{clientData.email}</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="font-bold text-white">WhatsApp & SMS</p>
                    <p className="text-[10px] text-slate-400">{clientData.phone}</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Connected</Badge>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold text-white">Client Portal Feed</p>
                    <p className="text-[10px] text-slate-400">Invite-Only Closed Channel</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Verified</Badge>
              </div>
            </div>
          </Card>

          <Card
            header={
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-xs">Direct Client Payment Dispatch</span>
              </div>
            }
          >
            <div className="space-y-3 text-xs">
              <p className="text-slate-400">Issue direct UPI / Razorpay payment link to client's portal dashboard.</p>
              <Button
                variant="secondary"
                className="w-full justify-center"
                leftIcon={<DollarSign className="w-3.5 h-3.5 text-amber-400" />}
                onClick={() => addToast("Payment Request Sent", `Dispatched ₹15,000 retainer invoice link to ${clientData.name}.`, "success")}
              >
                Send UPI Retainer Invoice
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
