"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Modal Component
export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
      {/* dialog Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden w-full max-w-lg z-10 animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/15">
          <h2 className="text-sm font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// Drawer Component (Right slide-out)
export function Drawer({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs" />
      )}
      {/* Drawer Container */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 border-l border-slate-800 bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/15">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">{title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </>
  );
}
