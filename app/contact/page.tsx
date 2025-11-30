"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Initialize Handshake</h1>
          <p className="text-muted">Ping me for collaborations.</p>
        </div>

        {status === "success" ? (
          <div className="p-6 bg-green-500/10 border border-green-500 text-green-500 rounded text-center">
            Transmission received. I will reply shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-surface/50 p-8 rounded-2xl border border-white/5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Identity</label>
              <Input name="name" required placeholder="Your Name" className="bg-background border-white/10" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
              <Input name="email" type="email" required placeholder="you@example.com" className="bg-background border-white/10" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Transmission</label>
              <Textarea name="message" required placeholder="Type your message..." className="min-h-[120px] bg-background border-white/10" />
            </div>

            <Button disabled={status === "submitting"} className="w-full bg-white text-black hover:bg-gray-200 font-bold">
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}