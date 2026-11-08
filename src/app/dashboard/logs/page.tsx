"use client";

import { useState } from "react";
import { FileText, Pause, Play, RefreshCw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { JournalLogEntry } from "@/types/log";

const SAMPLE_LOGS: JournalLogEntry[] = [
  {
    id: "l-1",
    timestamp: "17:48:12",
    unit: "sshd.service",
    severity: "info",
    message: "Accepted publickey for root from 103.111.42.1 port 52310 ssh2",
    pid: 1042,
  },
  {
    id: "l-2",
    timestamp: "17:45:02",
    unit: "caddy.service",
    severity: "info",
    message: "tls.obtain: certificate obtained successfully for domain [api.pratamalabs.id]",
    pid: 1420,
  },
  {
    id: "l-3",
    timestamp: "17:39:44",
    unit: "kernel",
    severity: "warning",
    message: "TCP: possible SYN flooding on port 80. Sending cookies. Check SNMP counters.",
  },
  {
    id: "l-4",
    timestamp: "17:30:19",
    unit: "dockerd",
    severity: "info",
    message: "container c89f1a23 started with cgroups v2 resource quotas enabled",
    pid: 1184,
  },
  {
    id: "l-5",
    timestamp: "17:22:05",
    unit: "systemd-oomd",
    severity: "info",
    message: "Memory pressure below threshold (0.00% swap usage, PSI: 0.12)",
    pid: 388,
  },
];

export default function LogsPage() {
  const [logs, setLogs] = useState<JournalLogEntry[]>(SAMPLE_LOGS);
  const [severityFilter, setSeverityFilter] = useState<"all" | "warning" | "err">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);

  const filteredLogs = logs.filter((log) => {
    const matchesSeverity =
      severityFilter === "all" ? true : log.severity === severityFilter;
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Logs &amp; Audits
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Realtime systemd journald logs, authentication audits, and kernel dmesg buffers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsStreaming(!isStreaming)}
            className="text-xs gap-1.5 cursor-pointer"
          >
            {isStreaming ? (
              <>
                <Pause className="size-3.5" /> Pause Stream
              </>
            ) : (
              <>
                <Play className="size-3.5" /> Resume Stream
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={() => setLogs([...SAMPLE_LOGS])}
            className="text-xs font-medium gap-1.5 cursor-pointer"
          >
            <RefreshCw className="size-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-muted rounded-lg w-fit text-xs font-medium">
          <button
            onClick={() => setSeverityFilter("all")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              severityFilter === "all"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setSeverityFilter("warning")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              severityFilter === "warning"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Warnings
          </button>
          <button
            onClick={() => setSeverityFilter("err")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              severityFilter === "err"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Errors
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="size-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journal entries..."
            className="h-8 pl-8 text-xs bg-background border-border text-foreground w-full"
          />
        </div>
      </div>

      {/* Logs Card */}
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold text-foreground">
                Journald Incident Stream
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {isStreaming && (
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
              <Badge variant="outline" className="font-mono text-[10px]">
                journalctl -f
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border font-mono text-xs max-h-[460px] overflow-y-auto">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-3 flex items-start gap-3 hover:bg-muted/40 transition-colors">
                <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                <Badge
                  variant="outline"
                  className={`text-[9px] uppercase px-1.5 py-0 font-mono shrink-0 ${
                    log.severity === "err"
                      ? "border-rose-500/30 text-rose-500 bg-rose-500/10"
                      : log.severity === "warning"
                      ? "border-amber-500/30 text-amber-500 bg-amber-500/10"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {log.severity}
                </Badge>
                <span className="font-semibold text-foreground shrink-0">
                  [{log.unit}{log.pid ? `:${log.pid}` : ""}]
                </span>
                <span className="text-zinc-600 dark:text-zinc-300 break-all">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
