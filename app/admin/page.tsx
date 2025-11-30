"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");

  // Simple client-side gate (Not secure for real banking, fine for a portfolio admin view)
  // Password: "admin"
  if (!auth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex gap-2">
            <Input 
                type="password" 
                placeholder="Access Code" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
            />
            <Button onClick={() => pass === "admin" && setAuth(true)}>Unlock</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Console</h1>
      <p className="text-green-500 mb-4">Access Granted.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border border-white/10 rounded bg-surface/20">
            <h2 className="text-xl font-bold text-white mb-4">Stats</h2>
            <div>Total Projects: 3</div>
            <div>Total Views: ∞</div>
        </div>
        
        {/* You can add a Fetch here to get all Contact messages */}
        <div className="p-6 border border-white/10 rounded bg-surface/20">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <Button className="w-full mb-2">Clear Cache</Button>
            <Button className="w-full" variant="destructive">Lockdown Mode</Button>
        </div>
      </div>
    </main>
  );
}