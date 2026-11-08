"use client";

import { useState } from "react";
import { Cpu, Play, RotateCw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SystemServiceItem } from "@/types/service";

const SAMPLE_SERVICES: SystemServiceItem[] = [
  {
    id: "sshd",
    name: "sshd.service",
    description: "OpenSSH server daemon",
    loadState: "loaded",
    activeState: "active",
    subState: "running",
    pid: 1042,
    memoryBytes: 8400000,
    cpuPercentage: 0.1,
  },
  {
    id: "docker",
    name: "docker.service",
    description: "Docker Application Container Engine",
    loadState: "loaded",
    activeState: "active",
    subState: "running",
    pid: 1184,
    memoryBytes: 68500000,
    cpuPercentage: 0.5,
  },
  {
    id: "caddy",
    name: "caddy.service",
    description: "Caddy Web Server with automatic HTTPS",
    loadState: "loaded",
    activeState: "active",
    subState: "running",
    pid: 1420,
    memoryBytes: 38200000,
    cpuPercentage: 0.2,
  },
  {
    id: "systemd-journald",
    name: "systemd-journald.service",
    description: "Journal Service",
    loadState: "loaded",
    activeState: "active",
    subState: "running",
    pid: 412,
    memoryBytes: 24500000,
    cpuPercentage: 0.1,
  },
  {
    id: "ufw",
    name: "ufw.service",
    description: "Uncomplicated firewall",
    loadState: "loaded",
    activeState: "active",
    subState: "exited",
  },
  {
    id: "cron",
    name: "cron.service",
    description: "Regular background program processing daemon",
    loadState: "loaded",
    activeState: "active",
    subState: "running",
    pid: 890,
    memoryBytes: 3100000,
    cpuPercentage: 0.0,
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<SystemServiceItem[]>(SAMPLE_SERVICES);

  const filteredServices = services.filter(
    (svc) =>
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestart = (id: string) => {
    // Quick optimistic visual toggle
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, subState: "restarting..." } : s))
    );
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, subState: "running" } : s))
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            System Services
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Manage systemd units, startup daemons, and running background processes
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="text-xs gap-1.5 cursor-pointer">
            <RotateCw className="size-3.5" /> Reload Daemon
          </Button>
          <Button size="sm" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Play className="size-3.5" /> Start Service
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="size-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service name (e.g. caddy, sshd)..."
            className="h-8 pl-8 text-xs bg-background border-border text-foreground w-full"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-border bg-card text-foreground text-xs font-mono">
            Active: {services.filter((s) => s.activeState === "active").length}
          </Badge>
          <Badge variant="outline" className="border-border bg-card text-muted-foreground text-xs font-mono">
            Failed: 0
          </Badge>
        </div>
      </div>

      {/* Services Table */}
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                Systemd Units
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Active daemon processes controlled via host systemctl interface
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-mono">Unit Name</TableHead>
                <TableHead className="text-xs font-mono">State</TableHead>
                <TableHead className="text-xs font-mono">PID</TableHead>
                <TableHead className="text-xs font-mono">Memory</TableHead>
                <TableHead className="text-xs font-mono">Description</TableHead>
                <TableHead className="text-xs font-mono text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((svc) => (
                <TableRow key={svc.id} className="border-border text-xs font-mono">
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <Cpu className="size-3.5 text-zinc-400" />
                      <span>{svc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono ${
                        svc.activeState === "active"
                          ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {svc.subState}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{svc.pid ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {svc.memoryBytes ? `${(svc.memoryBytes / 1048576).toFixed(1)} MB` : "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {svc.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleRestart(svc.id)}
                        className="h-7 text-xs cursor-pointer hover:bg-muted"
                        title="Restart service"
                      >
                        <RotateCw className="size-3 mr-1" /> Restart
                      </Button>
                    </div>
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
