"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Maximize2, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";

interface TerminalLine {
  id: string;
  type: "system" | "command" | "output" | "error";
  text: string;
}

const INITIAL_LOGS: TerminalLine[] = [
  { id: "1", type: "system", text: `${SITE_CONFIG.defaultNode.kernel} #${SITE_CONFIG.defaultNode.os}` },
  { id: "2", type: "system", text: `${SITE_CONFIG.name} Daemon v${SITE_CONFIG.version} (WSS Session)` },
  { id: "3", type: "system", text: `Authenticated as root. Type 'help' for available commands.` },
];

export default function WebTerminalPage() {
  const [logs, setLogs] = useState<TerminalLine[]>(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newLogs: TerminalLine[] = [
      ...logs,
      { id: Date.now().toString(), type: "command", text: `root@${SITE_CONFIG.defaultNode.id}:~# ${cmd}` },
    ];

    switch (cmd.toLowerCase()) {
      case "clear":
        setLogs([]);
        setInputVal("");
        return;
      case "help":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: "Supported commands: help, uptime, uname -a, df -h, free -m, docker ps, clear",
        });
        break;
      case "uptime":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: " 17:48:00 up 14 days,  6:12,  1 user,  load average: 0.18, 0.22, 0.19",
        });
        break;
      case "uname -a":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `Linux ${SITE_CONFIG.defaultNode.id} 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,
        });
        break;
      case "df -h":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p2  120G   42G   73G  37% /\n/dev/nvme0n1p1  512M  6.1M  506M   2% /boot/efi",
        });
        break;
      case "free -m":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: "               total        used        free      shared  buff/cache   available\nMem:            7912        3420        2140         128        2352        4210\nSwap:           2048          12        2036",
        });
        break;
      case "docker ps":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: "CONTAINER ID   IMAGE                 STATUS         PORTS                     NAMES\nc89f1a23       caddy:2.8.4-alpine    Up 3 days      0.0.0.0:80->80/tcp        caddy-reverse-proxy\nb41e8c71       postgres:16.3-alpine  Up 14 days     127.0.0.1:5432->5432/tcp  postgres-primary\nf9024a18       redis:7.2.5-alpine    Up 14 days     127.0.0.1:6379->6379/tcp  redis-session-cache",
        });
        break;
      default:
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "error",
          text: `bash: ${cmd}: command not found. Type 'help' for available host commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  return (
    <div className="space-y-4 h-[75vh] sm:h-[calc(100vh-140px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border shrink-0">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TerminalIcon className="size-5" /> Web Terminal
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Browser-based PTY shell session directly connected to host daemon
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-border bg-card text-foreground font-mono text-[10px] sm:text-[11px] gap-1.5 py-1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>TTY: /dev/pts/1</span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLogs(INITIAL_LOGS)}
            className="text-xs gap-1.5 cursor-pointer"
          >
            <RotateCcw className="size-3.5" /> Reset
          </Button>
          <Button size="sm" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Maximize2 className="size-3.5" /> Fullscreen
          </Button>
        </div>
      </div>

      {/* Terminal Canvas */}
      <div className="flex-1 rounded-xl bg-zinc-950 dark:bg-black border border-border p-4 font-mono text-xs text-zinc-300 flex flex-col justify-between overflow-hidden shadow-sm">
        <div className="space-y-1.5 overflow-y-auto pr-1 flex-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`leading-relaxed whitespace-pre-wrap ${
                log.type === "command"
                  ? "text-zinc-100 font-semibold"
                  : log.type === "error"
                  ? "text-rose-400"
                  : log.type === "system"
                  ? "text-zinc-500"
                  : "text-emerald-400"
              }`}
            >
              {log.text}
            </div>
          ))}

          {/* Interactive Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 text-white pt-2">
            <span className="text-zinc-400 font-bold shrink-0">
              root@{SITE_CONFIG.defaultNode.id}:~#
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-zinc-100 font-mono text-xs p-0 m-0 focus:ring-0"
              placeholder=""
            />
          </form>
          <div ref={terminalBottomRef} />
        </div>

        <div className="pt-3 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-zinc-500 shrink-0">
          <span>WebSocket Secure (WSS) Active • TLS 1.3</span>
          <span>Buffer: 10,000 lines</span>
        </div>
      </div>
    </div>
  );
}
