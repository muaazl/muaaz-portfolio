"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCommandMenu } from "@/hooks/use-command-menu";
import { FaCode, FaLaptop, FaUser, FaGamepad, FaTerminal, FaHistory, FaCoffee, FaWrench } from "react-icons/fa";
import { FiFileText, FiZap } from "react-icons/fi";

export function CommandMenu() {
  const { isOpen, setOpen } = useCommandMenu();
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setOpen]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
      onClick={(e) => { if(e.target === e.currentTarget) setOpen(false); }}
    >
      <Command className="w-full max-w-lg bg-[#0f1317] border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-white">
        <div className="px-4 py-3 border-b border-white/10">
            <Command.Input 
                placeholder="Type a command..." 
                className="w-full bg-transparent outline-none text-white placeholder:text-muted-foreground"
            />
        </div>
        <Command.List className="p-2 max-h-[60vh] overflow-y-auto">
          <Command.Empty className="p-4 text-center text-muted-foreground">No results found.</Command.Empty>
          <Command.Group heading="Main" className="text-xs text-muted-foreground px-2 py-1 mb-2">
            <Item icon={<FaUser />} onSelect={() => run(() => router.push("/about"))}>About</Item>
            <Item icon={<FaCode />} onSelect={() => run(() => router.push("/projects"))}>Projects</Item>
            <Item icon={<FaHistory />} onSelect={() => run(() => router.push("/experience"))}>Experience</Item>
            <Item icon={<FiFileText />} onSelect={() => run(() => router.push("/blog"))}>Blog</Item>
          </Command.Group>
          <Command.Group heading="Playground" className="text-xs text-muted-foreground px-2 py-1 mb-2">
            <Item icon={<FaGamepad />} onSelect={() => run(() => router.push("/game"))}>Speed Coder</Item>
            <Item icon={<FaTerminal />} onSelect={() => run(() => router.push("/playground"))}>Physics Sandbox</Item>
            <Item icon={<FaWrench />} onSelect={() => run(() => router.push("/uses"))}>/uses (Gear)</Item>
          </Command.Group>
          <Command.Group heading="System" className="text-xs text-muted-foreground px-2 py-1 mb-2">
            <Item icon={<FiZap />} onSelect={() => run(() => router.push("/now"))}>/now</Item>
            <Item icon={<FaCode />} onSelect={() => run(() => router.push("/snippets"))}>Code Snippets</Item>
            <Item icon={<FaHistory />} onSelect={() => run(() => router.push("/changelog"))}>Changelog</Item>
            <Item icon={<FaCoffee />} onSelect={() => run(() => router.push("/guestbook"))}>Guestbook</Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

function Item({ children, icon, onSelect }: any) {
    return (
        <Command.Item 
            onSelect={onSelect}
            className="flex items-center gap-2 px-3 py-2 rounded text-sm text-white hover:bg-accent-1/20 hover:text-accent-1 cursor-pointer transition-colors aria-selected:bg-accent-1/20 aria-selected:text-accent-1"
        >
            {icon && <span className="w-4 h-4 text-muted-foreground group-hover:text-accent-1">{icon}</span>}
            {children}
        </Command.Item>
    )
}