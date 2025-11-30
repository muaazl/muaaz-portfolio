"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Certificate from "@/components/certificate";

interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  createdAt: string; // ISO date string
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/guestbook").then(res => res.json()).then((data: GuestbookEntry[]) => setEntries(data));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!name || !msg) return;
    
    const res = await fetch("/api/guestbook", {
      method: "POST",
      body: JSON.stringify({ name, message: msg })
    });
    
    if(res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        setMsg("");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Guestbook</h1>
      <p className="text-muted mb-8">Leave a mark on the database. Permanent record.</p>
      
      <form onSubmit={submit} className="mb-12 flex flex-col gap-4 p-6 bg-surface/30 rounded-xl border border-white/10">
        <Input 
            placeholder="Your Name / Handle" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="bg-black/50 border-white/10"
        />
        <Input 
            placeholder="Message..." 
            value={msg} 
            onChange={e => setMsg(e.target.value)} 
            className="bg-black/50 border-white/10"
        />
        <Button type="submit" className="bg-accent-2 text-black hover:bg-white w-fit font-bold">
            Sign Database
        </Button>
      </form>

      <div className="space-y-4 mb-16">
        {entries.map((entry) => (
          <div key={entry._id} className="p-4 border-l-2 border-white/10 hover:border-accent-1 transition-colors pl-4 bg-surface/10 rounded-r-lg">
             <div className="flex items-baseline gap-3 mb-1">
                <span className="font-bold text-white">{entry.name}</span>
                <span className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString()}</span>
             </div>
             <p className="text-muted-foreground">{entry.message}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-16">
        <Certificate />
      </div>

    </main>
  );
}
