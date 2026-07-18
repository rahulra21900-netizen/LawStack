"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Input, Textarea } from "@/components/forms";
import { Plus, Pin, Trash } from "lucide-react";

export default function NotesTab() {
  const { addToast } = useNotifications();
  const [notes, setNotes] = useState([
    { id: 1, title: "Filing Deadline Override", content: "Met opposing counsel. Verified filing deadline extensions schedule.", pinned: true },
    { id: 2, title: "ARC blue prints index", content: "Ensure engineering blueprints schedule is encrypted at rest.", pinned: false }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNote = () => {
    if (!newTitle || !newContent) return;
    const newNote = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      pinned: false
    };
    setNotes(prev => [newNote, ...prev]);
    setNewTitle("");
    setNewContent("");
    addToast("Note Added", "Case note appended to brief log.", "success");
  };

  const togglePin = (id: number) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    addToast("Note Updated", "Note pin toggle updated.");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Note Form */}
        <div className="md:col-span-1 bg-slate-950/40 border border-slate-800 p-4 rounded-xl space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">New Note Brief</h3>
          <Input label="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Note title..." />
          <Textarea label="Content details" value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Write details here..." />
          <Button variant="primary" className="w-full" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddNote}>
            Add Case Note
          </Button>
        </div>

        {/* Notes list */}
        <div className="md:col-span-2 space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 relative group">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-xs">{note.title}</h4>
                <button onClick={() => togglePin(note.id)} className={`p-1 rounded hover:bg-slate-800 ${note.pinned ? "text-amber-500" : "text-slate-500"}`}>
                  <Pin className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
