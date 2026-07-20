"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_KNOWLEDGE_ARTICLES } from "@/mocks/knowledge";
import { BookOpen, Plus, Star, Clock, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function KnowledgeBasePage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Firm Knowledge Base</span>
          </h1>
          <p className="text-xs text-slate-400">Access research, Supreme Court rules summaries, and precedents libraries.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => addToast("Create Precedent Article", "Content editor template opened.", "info")}
        >
          New Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Articles" value={MOCK_KNOWLEDGE_ARTICLES.length} info="Published" trend="up" />
        <MetricCard title="Categories" value="6" info="Practice areas" trend="neutral" />
        <MetricCard title="Favorites" value="24" info="Bookmarked" trend="up" />
        <MetricCard title="Views (30d)" value="412" info="Read" trend="up" change="+18%" />
      </div>

      <DataTable
        title="Shared Knowledge Base Precedents"
        data={MOCK_KNOWLEDGE_ARTICLES}
        columns={[
          { header: "Article Title", accessor: (a) => <span className="font-bold text-white">{a.title}</span> },
          { header: "Category", accessor: (a) => <Badge label={a.category.replace(/_/g, ' ')} variant="info" /> },
          { header: "Author", accessor: (a) => <span className="font-semibold text-slate-300">{a.author}</span> },
          { header: "Content Sneak Peek", accessor: (a) => <p className="text-slate-400 truncate max-w-sm">{a.content}</p> },
          { header: "Last Updated", accessor: (a) => <span className="text-[10px] text-slate-500 font-mono">{a.lastUpdated}</span> }
        ]}
      />
    </div>
  );
}
