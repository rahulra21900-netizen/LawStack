"use client";

import React, { useState } from "react";
import { Bell, CheckSquare, Shield, X } from "lucide-react";
import { Badge } from "@/components/ui";

export function NotificationCenter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Hearing scheduled for Wayne Tax Matter next Tuesday.", read: false, time: "Just now" },
    { id: 2, text: "Invoice INV-2026-0044 status updated to Overdue.", read: false, time: "2h ago" }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed right-4 top-16 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 text-xs overflow-hidden flex flex-col max-h-[450px]">
      <div className="p-3.5 border-b border-slate-800 flex justify-between items-center bg-slate-950/60">
        <div className="flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-white">Notification Hub</span>
          {unreadCount > 0 && <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-2 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/40 text-[10px]">
        <button onClick={markAllRead} className="text-blue-400 hover:underline font-bold">Mark all read</button>
        <button onClick={clearNotifications} className="text-slate-500 hover:text-white font-bold">Clear all</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className="space-y-1 relative pl-3.5 border-l-2 border-blue-500 bg-slate-950/20 p-2.5 rounded-lg border border-slate-850">
              {!n.read && <span className="absolute left-1 top-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
              <p className="text-slate-250 leading-relaxed">{n.text}</p>
              <p className="text-[9px] text-slate-500 font-mono">{n.time}</p>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500">All caught up! No notifications.</div>
        )}
      </div>
    </div>
  );
}
