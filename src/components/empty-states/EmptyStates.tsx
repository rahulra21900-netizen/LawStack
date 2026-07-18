"use client";

import React from "react";
import {
  FileX,
  Search,
  BellOff,
  Briefcase,
  Users,
  Activity,
  Calendar,
  Sparkles,
  Inbox,
} from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
}

export function NoData({ title = "No Data Available", description = "There are no records to display at this time.", actionText, onActionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/25 border border-slate-800/80 rounded-xl max-w-sm mx-auto">
      <Inbox className="w-10 h-10 text-slate-500 mb-3" />
      <h3 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h3>
      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{description}</p>
      {actionText && onActionClick && (
        <button onClick={onActionClick} className="mt-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-bold transition-colors text-white">
          {actionText}
        </button>
      )}
    </div>
  );
}

export function NoSearchResults({ query = "" }) {
  return (
    <NoData
      title="No Search Results"
      description={`We couldn't find any matches for "${query}". Try refining your keywords.`}
    />
  );
}

export function NoNotifications() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <BellOff className="w-8 h-8 text-slate-600 mb-2" />
      <p className="text-xs font-semibold text-slate-300">All caught up!</p>
      <p className="text-[9px] text-slate-500 mt-0.5">You have no unread notifications.</p>
    </div>
  );
}

export function NoDocuments({ onUpload }: { onUpload?: () => void }) {
  return (
    <NoData
      title="No Documents Filed"
      description="Start by uploading briefs, contracts, or court transcripts for this case file."
      actionText="Upload Document"
      onActionClick={onUpload}
    />
  );
}

export function NoCases({ onCreate }: { onCreate?: () => void }) {
  return (
    <NoData
      title="No Cases Docketed"
      description="Create your first legal case matter and assign attorneys to start track logs."
      actionText="Create Case"
      onActionClick={onCreate}
    />
  );
}

export function NoClients({ onCreate }: { onCreate?: () => void }) {
  return (
    <NoData
      title="No Clients Registered"
      description="Register individual client profiles to link court dockets and bill billing ledgers."
      actionText="Add Client"
      onActionClick={onCreate}
    />
  );
}

export function NoActivity() {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-lg text-xs text-slate-400">
      <Activity className="w-4 h-4 text-slate-600 shrink-0" />
      <span>No recent activity logs recorded in this jurisdiction.</span>
    </div>
  );
}

export function NoCalendarEvents() {
  return (
    <div className="p-4 bg-slate-900/30 border border-slate-800/80 rounded-lg text-center">
      <Calendar className="w-6 h-6 text-slate-600 mx-auto mb-1.5" />
      <p className="text-xs font-semibold text-slate-300">No Upcoming Events</p>
      <p className="text-[9px] text-slate-500">Your docket schedule is clear for the selected dates.</p>
    </div>
  );
}

export function NoAiHistory() {
  return (
    <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
      <Sparkles className="w-6 h-6 text-slate-600 mx-auto mb-2" />
      <p className="text-xs font-semibold text-slate-300">AI Prompt History Empty</p>
      <p className="text-[9px] text-slate-500 mt-0.5">Start a conversation with AI assistant to draft or inspect legal documentation.</p>
    </div>
  );
}
