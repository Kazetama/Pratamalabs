"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { SITE_CONFIG } from "@/config/site";

export function LoginVisualPanel() {
  return (
    <div className="h-full flex flex-col justify-between relative bg-zinc-950 overflow-hidden font-sans p-8 xl:p-12">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.25}
        duration={3}
        repeatDelay={1}
        className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] fill-zinc-800/50 stroke-zinc-800"
      />

      <div className="absolute top-1/3 right-1/4 size-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Host Node Metadata */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-zinc-200 font-medium">{SITE_CONFIG.defaultNode.id}</span>
          <span className="text-zinc-600">/</span>
          <span>host-daemon</span>
        </div>
        <span className="text-zinc-500 font-mono text-[11px]">v{SITE_CONFIG.version}</span>
      </div>

      {/* Main Terminal Telemetry Preview */}
      <div className="relative z-10 my-auto max-w-lg space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Host Diagnostics &amp; Control
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Lightweight Linux management with kernel forensics, real-time socket exposure audit, and container observability.
          </p>
        </div>

        <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-2xl p-4 font-mono text-xs backdrop-blur-md space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="size-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="text-[11px] text-zinc-400">systemctl status host-agent</span>
          </div>

          <div className="space-y-1.5 text-zinc-300">
            <p className="text-emerald-400 flex items-center gap-2">
              <span className="animate-pulse">●</span>
              <span className="font-semibold">host-agent.service - Active (running)</span>
            </p>
            <p className="text-zinc-400 pl-3">
              Memory: <span className="text-zinc-200">28.4 MB</span> • CPU: <span className="text-zinc-200">0.2%</span> • Tasks: <span className="text-zinc-200">12</span>
            </p>
            <p className="text-zinc-400 pl-3">
              Kernel: <span className="text-zinc-200">{SITE_CONFIG.defaultNode.kernel}</span> • Host: <span className="text-zinc-200">{SITE_CONFIG.defaultNode.os}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry Status Bar */}
      <div className="relative z-10 text-xs text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-4">
        <div className="flex items-center gap-3">
          <span>Uptime: <strong className="text-zinc-300">14d 6h</strong></span>
          <span>•</span>
          <span>Inodes: <strong className="text-emerald-400">5.6%</strong></span>
        </div>
        <span>Encrypted Channel</span>
      </div>
    </div>
  );
}
