"use client";

import React from "react";
import { X, ExternalLink, ShieldCheck, Copy, Check, FileText, Calendar, Tag, User, DollarSign, Scale } from "lucide-react";
import { Badge, Button } from "@/components/ui";

export interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: "success" | "warning" | "error" | "info" | "neutral" | "primary";
  data?: Record<string, any>;
  customBody?: React.ReactNode;
  actionUrl?: string;
  actionLabel?: string;
}

export function DetailDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  badgeText,
  badgeVariant = "info",
  data,
  customBody,
  actionUrl,
  actionLabel = "Open Full View",
}: DetailDrawerProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl shadow-slate-950 flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
          
          {/* Top Bar / Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between bg-slate-950/50">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
                {badgeText && <Badge variant={badgeVariant} size="sm">{badgeText}</Badge>}
              </div>
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {customBody ? (
              customBody
            ) : data ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Record Attributes</span>
                  <button
                    onClick={handleCopyJson}
                    className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied!" : "Copy JSON"}</span>
                  </button>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl divide-y divide-slate-800/60 overflow-hidden text-xs">
                  {Object.entries(data).map(([key, val]) => (
                    <div key={key} className="px-4 py-3 flex items-start justify-between gap-4">
                      <span className="font-semibold text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="text-slate-200 font-mono text-right break-all">
                        {typeof val === "object" ? JSON.stringify(val) : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">No inspector details available.</div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
              Close
            </Button>
            {actionUrl && (
              <a
                href={actionUrl}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <span>{actionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
