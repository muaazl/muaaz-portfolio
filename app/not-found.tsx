"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <h1 className="text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-black opacity-50 select-none">
        404
      </h1>
      <div className="z-10 text-center space-y-6">
        <h2 className="text-3xl font-bold text-accent-1 tracking-widest uppercase">
          Signal Lost
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The coordinates you entered point to a void in the neural network. 
          This sector has not been compiled yet.
        </p>
        <Link href="/">
          <Button variant="outline" className="border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-white mt-4">
            Return to Base
          </Button>
        </Link>
      </div>
      <div className="absolute top-1/3 w-full h-px bg-accent-1/50 blur-[2px]" />
      <div className="absolute bottom-1/3 w-full h-px bg-accent-2/50 blur-[2px]" />
    </div>
  );
}