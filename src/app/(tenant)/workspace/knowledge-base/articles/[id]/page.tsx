"use client";

import React from "react";
import { Breadcrumb, Button } from "@/components/ui";
import { MOCK_KNOWLEDGE_ARTICLES } from "@/mocks/knowledge";
import { Card } from "@/components/cards";
import Link from "next/link";

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const article = MOCK_KNOWLEDGE_ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Precedent Article ID "{id}" does not exist in knowledge center database.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base", href: "/workspace/knowledge-base/dashboard" }, { name: "Articles", href: "/workspace/knowledge-base/articles" }, { name: article.title }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">{article.title}</h1>
          <p className="text-xs text-slate-400">Author: {article.author} • Last Updated: {article.lastUpdated}</p>
        </div>
        <Link href="/workspace/knowledge-base/articles">
          <Button variant="secondary">Back to Articles</Button>
        </Link>
      </div>

      <Card header={<div className="font-bold text-white text-xs">Article Content briefing</div>}>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl whitespace-pre-line">
          {article.content}
        </p>
      </Card>
    </div>
  );
}
