"use client";

import { useState } from "react";
import {
  Activity,
  Cpu,
  HardDrive,
  Network,
  Power,
  RefreshCw,
  Server,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SITE_CONFIG } from "@/config/site";

interface ProcessEntry {
  pid: number;
  user: string;
  cpu: number;
  memoryMb: number;
  command: string;
}

const TOP_PROCESSES: ProcessEntry[] = [
  { pid: 1420, user: "root", cpu: 1.4, memoryMb: 38.2, command: "/usr/bin/caddy run --config /etc/caddy/Caddyfile" },
  { pid: 1184, user: "root", cpu: 0.8, memoryMb: 68.5, command: "/usr/bin/dockerd -H fd://" },
  { pid: 2190, user: "postgres", cpu: 0.5, memoryMb: 184.6, command: "postgres: 16/main: checkpointer" },
  { pid: 1042, user: "root", cpu: 0.2, memoryMb: 8.4, command: "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups" },
  { pid: 850, user: "root", cpu: 0.2, memoryMb: 24.5, command: "/usr/local/bin/pratama-daemon --port 8443" },
];

export default function DashboardOverviewPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Overview
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Realtime performance metrics and host telemetry status for {SITE_CONFIG.defaultNode.id}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Reboot Node Confirmation */}
          <Dialog>
            <DialogTrigger render={
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-rose-600 dark:text-rose-400 border-border hover:bg-rose-50 dark:hover:bg-rose-950/20 gap-1.5 cursor-pointer"
              >
                <Power className="size-3.5" />
                <span>Reboot</span>
              </Button>
            } />
            <DialogContent className="bg-card border border-border text-foreground max-w-sm sm:max-w-md p-6 rounded-2xl shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldAlert className="size-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <DialogTitle className="text-base font-bold text-foreground tracking-tight">
                    Reboot Server Node?
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                    Are you sure you want to reboot <strong className="text-foreground">{SITE_CONFIG.defaultNode.id}</strong>? Active client SSH connections, running containers, and background services will be temporarily interrupted.
                  </DialogDescription>
                </div>
              </div>

              <DialogFooter className="mt-4 pt-3 border-t border-border flex-row justify-end gap-2.5">
                <DialogClose render={
                  <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-medium border-border cursor-pointer">
                    Cancel
                  </Button>
                } />
                <Button size="sm" className="h-9 px-4 text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 cursor-pointer">
                  Reboot Node
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            onClick={handleRefresh}
            className="text-xs font-medium gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh Metrics</span>
          </Button>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU */}
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Cpu className="size-3.5" /> CPU Load
              </span>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-mono">
                4 Cores
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              24.5%
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-mono">
              Load avg: 1.12, 0.85, 0.60
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[11px] font-mono text-muted-foreground pt-0">
            <span>iowait: 1.2% • steal: 0.0%</span>
          </CardContent>
        </Card>

        {/* RAM */}
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5" /> Memory (RAM)
              </span>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-mono">
                43.6%
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              3.4 GB
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-mono">
              Total available: 7.8 GB
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[11px] font-mono text-muted-foreground pt-0">
            <span>Swap: 12 MB • OOM Risk: Low</span>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <HardDrive className="size-3.5" /> Storage / NVMe
              </span>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-mono">
                Inodes 5.6%
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              42.1 GB
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-mono">
              Mounted on / (120 GB total)
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[11px] font-mono text-muted-foreground pt-0">
            <span>Write latency: 1.4 ms</span>
          </CardContent>
        </Card>

        {/* Network */}
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Network className="size-3.5" /> Network Traffic
              </span>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-mono">
                Active
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              8.5 MB/s
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-mono">
              RX: 2.4 MB/s • TX: 6.1 MB/s
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[11px] font-mono text-muted-foreground pt-0">
            <span>Sockets: 142 ESTAB • 0 SYN_RECV</span>
          </CardContent>
        </Card>
      </div>

      {/* Top Process Monitor */}
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Server className="size-4 text-muted-foreground" />
                <span>Top Active Processes</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Processes ranked by CPU and memory consumption from /proc filesystem
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              procfs
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-mono">PID</TableHead>
                <TableHead className="text-xs font-mono">User</TableHead>
                <TableHead className="text-xs font-mono">CPU %</TableHead>
                <TableHead className="text-xs font-mono">Memory</TableHead>
                <TableHead className="text-xs font-mono">Command</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TOP_PROCESSES.map((proc) => (
                <TableRow key={proc.pid} className="border-border text-xs font-mono">
                  <TableCell className="font-semibold text-foreground">{proc.pid}</TableCell>
                  <TableCell className="text-muted-foreground">{proc.user}</TableCell>
                  <TableCell className="text-foreground">{proc.cpu}%</TableCell>
                  <TableCell className="text-muted-foreground">{proc.memoryMb} MB</TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate">
                    {proc.command}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
