"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCommandMenu } from "@/hooks/use-command-menu";
import { useKonami } from "@/hooks/use-konami";
import { FaSearch } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Exp", path: "/experience" },
  { name: "Blog", path: "/blog" },
  { name: "Uses", path: "/uses" },
  { name: "Guestbook", path: "/guestbook" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Game", path: "/game" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { setOpen } = useCommandMenu();
  useKonami();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 sm:pt-6 px-4 sm:px-0 pointer-events-none"
    >
      <div className="flex items-center gap-2 max-w-full">
        <nav className="pointer-events-auto flex items-center gap-1 rounded-full px-2 py-2 backdrop-blur-md border transition-all duration-500 overflow-x-auto whitespace-nowrap scrollbar-hide max-w-[85vw] sm:max-w-none bg-black/80 border-accent-1/50 shadow-[0_0_15px_rgba(0,225,255,0.3)]" >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors rounded-full flex-shrink-0 whitespace-nowrap",
                  isActive 
                    ? "text-white" 
                    : "text-muted hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full -z-10 bg-accent-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full border transition-all duration-300 pointer-events-auto flex-shrink-0 bg-black/80 border-accent-1 text-accent-1 shadow-[0_0_10px_rgba(0,225,255,0.3)]"
          aria-label="Open Command Menu"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </motion.header>
  );
}