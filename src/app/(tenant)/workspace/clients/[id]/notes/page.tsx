"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Input, Textarea } from "@/components/forms";
import { Plus } from "lucide-react";

export default function NotesTab() {
  const { addToast } = useNotifications();
  const [notes, setNotes] = useState([
    { id: 1, title: "Onboarding Call Notes", content: "Met CFO Pepper Potts. Verified subsidiary entities roster." }
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    if (!title || !content) return;
    setNotes(prev => [{ id: Date.now(), title, content }, ...prev]);
    setTitle("");
    setContent("");
    addToast("Client Note Added", "Appended note entry successfully.", "success");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">New Note Entry</h3>
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title..." />
          <Textarea label="Content details" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write details here..." />
          <Button variant="primary" className="w-full" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddNote}>
            Add Client Note
          </Button>
        </div>

        <div className="md:col-span-2 space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-white text-xs">{note.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
