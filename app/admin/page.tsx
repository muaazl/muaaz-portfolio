"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaDatabase, FaUsers, FaTrash } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import { FiLayout, FiMail, FiFileText, FiRefreshCcw } from "react-icons/fi";
import { cn } from "@/lib/utils";

type AdminData = {
  counts: {
    projects: number;
    posts: number;
    guestbook: number;
    bucket: number;
    messages: number;
  };
  messages: Array<{
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  }>;
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      fetchStats();
    }
  }, [auth]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!auth) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-accent-1 rounded-full mx-auto animate-pulse mb-4" />
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Restricted Access</h1>
          <p className="text-muted-foreground">Enter clearance code.</p>
        </div>
        <div className="flex gap-2 w-full max-w-xs">
            <Input 
                type="password" 
                placeholder="Passcode" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                className="bg-surface/50 border-white/10 text-center tracking-[0.5em]"
            />
            <Button 
              onClick={() => pass === "admin" && setAuth(true)}
              className="bg-accent-2 text-black hover:bg-white"
            >
              Unlock
            </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FaDatabase className="text-accent-1" />
            Admin Console
          </h1>
          <p className="text-muted-foreground text-sm mt-1">System status: <span className="text-green-500">Online</span></p>
        </div>
        <Button onClick={fetchStats} variant="outline" className="gap-2 border-white/10 hover:bg-surface/50">
          {loading ? <TbLoader2 className="w-4 h-4 animate-spin" /> : <FiRefreshCcw className="w-4 h-4" />}
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <StatCard label="Projects" value={data?.counts.projects} icon={<FiLayout />} />
        <StatCard label="Blog Posts" value={data?.counts.posts} icon={<FiFileText />} />
        <StatCard label="Guestbook" value={data?.counts.guestbook} icon={<FaUsers />} />
        <StatCard label="Bucket List" value={data?.counts.bucket} icon={<FiRefreshCcw />} />
        <StatCard label="Messages" value={data?.counts.messages} icon={<FiMail />} highlight />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiMail className="w-5 h-5 text-accent-2" />
            Incoming Transmissions
          </h2>
          <div className="rounded-xl border border-white/10 bg-surface/20 overflow-hidden">
             {loading ? (
                <div className="p-8 text-center text-muted-foreground">Syncing data...</div>
             ) : data?.messages.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No messages found.</div>
             ) : (
               <div className="divide-y divide-white/5">
                 {data?.messages.map((msg) => (
                   <div key={msg._id} className="p-4 hover:bg-white/5 transition-colors group">
                     <div className="flex justify-between items-start mb-2">
                       <div className="font-bold text-white">{msg.name}</div>
                       <div className="text-xs text-muted-foreground font-mono">
                         {new Date(msg.createdAt).toLocaleDateString()}
                       </div>
                     </div>
                     <div className="text-xs text-accent-1 mb-2 font-mono">{msg.email}</div>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                       {msg.message}
                     </p>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
        <div className="space-y-8">
          <div className="p-6 border border-white/10 rounded-xl bg-surface/20">
              <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-white text-black hover:bg-gray-200 justify-start">
                  <FiRefreshCcw className="mr-2 h-4 w-4" /> Clear Vercel Cache
                </Button>
                <Button className="w-full bg-surface border border-white/10 hover:bg-white/5 justify-start">
                  <FiLayout className="mr-2 h-4 w-4" /> Rebuild Static Pages
                </Button>
                <Button className="w-full bg-red-900/20 text-red-500 hover:bg-red-900/40 border border-red-900/50 justify-start">
                  <FaTrash className="mr-2 h-4 w-4" /> Purge Spam
                </Button>
              </div>
          </div>
          <div className="p-6 border border-white/10 rounded-xl bg-surface/20">
              <h2 className="text-lg font-bold text-white mb-4">System Health</h2>
              <div className="space-y-4">
                <HealthItem label="Database Latency" value="24ms" status="good" />
                <HealthItem label="API Status" value="Operational" status="good" />
                <HealthItem label="Last Deploy" value="12m ago" status="neutral" />
                <HealthItem label="Storage" value="45%" status="good" />
              </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon, highlight = false }: any) {
  return (
    <div className={cn(
      "p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all",
      highlight 
        ? "bg-accent-1/10 border-accent-1/50 text-accent-1 shadow-[0_0_15px_rgba(0,225,255,0.1)]" 
        : "bg-surface/30 border-white/10 text-muted-foreground hover:border-white/20"
    )}>
      <div className={cn("mb-1", highlight ? "text-accent-1" : "text-white")}>{icon}</div>
      <div className="text-2xl font-bold font-mono text-white">
        {value === undefined ? "-" : value}
      </div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

function HealthItem({ label, value, status }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-white font-mono">{value}</span>
        <div className={cn(
          "w-2 h-2 rounded-full",
          status === "good" ? "bg-green-500" : status === "neutral" ? "bg-yellow-500" : "bg-red-500"
        )} />
      </div>
    </div>
  );
}