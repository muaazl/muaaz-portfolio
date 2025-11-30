"use client";
import { useEffect, useState } from "react";
import { FaStar, FaCode } from "react-icons/fa";
import { FiGitCommit } from "react-icons/fi";

export default function GitHubStats() {
  const [stats, setStats] = useState({ public_repos: 0, followers: 0 });

  useEffect(() => {
    fetch("https://api.github.com/users/muaazl")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatBox icon={<FaCode />} label="Repositories" value={stats.public_repos} />
      <StatBox icon={<FaStar />} label="Followers" value={stats.followers} />
      {/* Static numbers for "flavor" if you don't have WakaTime API set up yet */}
      <StatBox icon={<FiGitCommit />} label="Commits (2025)" value="450+" />
      <StatBox icon={<FaCode />} label="Hours Coded" value="1,200+" />
    </div>
  );
}

function StatBox({ icon, label, value }: any) {
  return (
    <div className="bg-surface/30 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-accent-1/50 transition-colors">
      <div className="text-accent-2 mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white font-mono">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}