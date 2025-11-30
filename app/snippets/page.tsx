"use client";
import { FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const snippets = [
  {
    title: "React Hook: useLocalStorage",
    lang: "TypeScript",
    code: `const [storedValue, setValue] = useState(() => { ... });`
  },
  {
    title: "CSS: Neon Glow Effect",
    lang: "CSS",
    code: `box-shadow: 0 0 10px #00e1ff, 0 0 20px #00e1ff;`
  }
];

export default function SnippetsPage() {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Code Snippets</h1>
      <div className="grid gap-6">
        {snippets.map((s, i) => (
          <div key={i} className="bg-surface/30 border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-black/40">
              <span className="font-mono text-sm text-accent-1">{s.title}</span>
              <Badge variant="outline" className="text-xs border-white/20">{s.lang}</Badge>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
              <code>{s.code}</code>
            </pre>
            <button 
              onClick={() => handleCopy(s.code)}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-muted hover:text-white"
            >
              {copied ? <FaCheck className="w-4 h-4 text-green-500" /> : <FaCopy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}