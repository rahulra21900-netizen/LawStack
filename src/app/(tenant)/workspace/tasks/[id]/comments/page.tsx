"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Textarea } from "@/components/forms";
import { Plus } from "lucide-react";

export default function CommentsTab() {
  const { addToast } = useNotifications();
  const [comments, setComments] = useState([
    { id: 1, author: "Priya Chandra", content: "Ensure client signing dockets are cleared before trial.", time: "1h ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment) return;
    setComments(prev => [...prev, { id: Date.now(), author: "Associate Attorney", content: newComment, time: "Just now" }]);
    setNewComment("");
    addToast("Comment Dispatched", "Comment added to task thread.");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="font-bold text-white">{c.author}</span>
              <span>{c.time}</span>
            </div>
            <p className="leading-relaxed">{c.content}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 bg-slate-950/40 border border-slate-800 p-4 rounded-xl max-w-xl">
        <Textarea label="Write reply..." value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Type comment details..." />
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddComment}>
          Post Comment
        </Button>
      </div>
    </div>
  );
}
