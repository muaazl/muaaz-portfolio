"use client";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function TimeStatus() {
  const [time, setTime] = useState("");
  const [isSleeping, setIsSleeping] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      // Sri Lanka is UTC+5:30
      const now = new Date();
      
      // Create date object for Colombo time
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Colombo", 
        hour: "numeric", 
        minute: "numeric",
        hour12: true 
      };
      
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      setTime(timeString);

      // Check hour (0-23) in Colombo
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        hour: "numeric",
        hour12: false
      });
      const hour = parseInt(formatter.format(now));

      // Assume sleeping between 1 AM (1) and 7 AM (7)
      setIsSleeping(hour >= 1 && hour < 7);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!time) return null; // Avoid hydration mismatch

  return (
    <div className="flex items-center gap-3 bg-surface/50 border border-white/10 px-4 py-2 rounded-full w-fit">
      <div className="relative">
        {isSleeping ? (
          <FaMoon className="w-4 h-4 text-purple-400" />
        ) : (
          <FaSun className="w-4 h-4 text-yellow-400" />
        )}
        {/* Blinking Dot */}
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
      
      <div className="flex flex-col leading-none">
        <span className="text-xs font-bold text-white">{time}</span>
        <span className="text-[10px] text-muted-foreground">Colombo, LK</span>
      </div>

      <div className="border-l border-white/10 pl-3 ml-1 text-xs text-muted-foreground">
        {isSleeping ? "Probably Sleeping 💤" : "Active / Coding ⚡"}
      </div>
    </div>
  );
}