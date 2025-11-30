"use client";
import { useState, useRef, use } from "react";
import { Button } from "@/components/ui/button";
import { FiRefreshCcw } from "react-icons/fi";

const SNIPPET = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`;

export default function GamePage() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);

    if (!startTime) setStartTime(Date.now());

    if (val === SNIPPET) {
      setCompleted(true);
      const timeInMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const wordCount = SNIPPET.split(" ").length;
      setWpm(Math.round(wordCount / timeInMinutes));
    }
  };

  const reset = () => {
    setInput("");
    setStartTime(null);
    setCompleted(false);
    setWpm(0);
    inputRef.current?.focus();
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Speed Coder</h1>
      
      <div className="relative w-full bg-surface/30 border border-white/10 rounded-xl p-6 font-mono text-sm md:text-base leading-relaxed overflow-hidden">
        {/* The Text to Type (Ghost Text) */}
        <div className="absolute inset-0 p-6 pointer-events-none select-none text-muted/30 whitespace-pre-wrap">
          {SNIPPET}
        </div>

        {/* The User Input (Overlay) */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleChange}
          disabled={completed}
          className="w-full h-[300px] bg-transparent text-accent-1 caret-white outline-none resize-none whitespace-pre-wrap"
          spellCheck={false}
          autoFocus
        />
      </div>

      {completed && (
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-muted-foreground text-lg mb-2">Protocol Complete</p>
          <div className="text-6xl font-black text-white mb-4">{wpm} <span className="text-2xl font-normal text-muted">WPM</span></div>
          <Button onClick={reset} className="bg-white text-black hover:bg-accent-1 hover:text-white">
            <FiRefreshCcw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </div>
      )}
    </main>
  );
}