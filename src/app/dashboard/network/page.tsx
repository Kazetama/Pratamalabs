"use client";

import { useState } from "react";
import { Globe, Lock, Plus, ShieldCheck } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ListeningPort } from "@/types/network";

const LISTENING_PORTS: ListeningPort[] = [
  {
    id: "p-22",
    protocol: "tcp",
    address: "0.0.0.0",
    port: 22,
    process: "sshd",
    pid: 1042,
    isPublic: true,
    service: "OpenSSH Server",
  },
  {
    id: "p-80",
    protocol: "tcp",
    address: "0.0.0.0",
    port: 80,
    process: "caddy",
    pid: 1420,
    isPublic: true,
    service: "HTTP Reverse Proxy",
  },
  {
    id: "p-443",
    protocol: "tcp",
    address: "0.0.0.0",
    port: 443,
    process: "caddy",
    pid: 1420,
    isPublic: true,
    service: "HTTPS TLS",
  },
  {
    id: "p-5432",
    protocol: "tcp",
    address: "127.0.0.1",
    port: 5432,
    process: "postgres",
    pid: 2190,
    isPublic: false,
    service: "PostgreSQL Database",
  },
  {
    id: "p-6379",
    protocol: "tcp",
    address: "127.0.0.1",
    port: 6379,
    process: "redis-server",
    pid: 2314,
    isPublic: false,
    service: "Redis Key-Value Cache",
  },
  {
    id: "p-8443",
    protocol: "tcp",
    address: "0.0.0.0",
    port: 8443,
    process: "pratama-daemon",
    pid: 850,
    isPublic: true,
    service: "Host Control Interface",
  },
];

export default function NetworkPage() {
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");

  const filteredPorts = LISTENING_PORTS.filter((p) => {
    if (filter === "public") return p.isPublic;
    if (filter === "private") return !p.isPublic;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Network &amp; Firewall
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Audit listening ports, inspect socket exposure, and configure host firewall rules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-border bg-card text-foreground text-xs gap-1.5 py-1 font-mono">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            <span>UFW: Active</span>
          </Badge>
          <Button size="sm" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Plus className="size-3.5" /> Add Firewall Rule
          </Button>
        </div>
      </div>

      {/* Exposure Filter Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-muted rounded-lg w-fit text-xs font-medium">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            filter === "all"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Sockets ({LISTENING_PORTS.length})
        </button>
        <button
          onClick={() => setFilter("public")}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            filter === "public"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Public (0.0.0.0)
        </button>
        <button
          onClick={() => setFilter("private")}
          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
            filter === "private"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Isolated (127.0.0.1)
        </button>
      </div>

      {/* Sockets Table */}
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                Listening Ports &amp; Sockets
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Active network listener matrix obtained from host kernel table
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              ss -tulpn
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-mono">Port</TableHead>
                <TableHead className="text-xs font-mono">Address</TableHead>
                <TableHead className="text-xs font-mono">Protocol</TableHead>
                <TableHead className="text-xs font-mono">Exposure</TableHead>
                <TableHead className="text-xs font-mono">Process (PID)</TableHead>
                <TableHead className="text-xs font-mono">Service Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPorts.map((port) => (
                <TableRow key={port.id} className="border-border text-xs font-mono">
                  <TableCell className="font-bold text-foreground">:{port.port}</TableCell>
                  <TableCell className="text-muted-foreground">{port.address}</TableCell>
                  <TableCell className="uppercase text-muted-foreground">{port.protocol}</TableCell>
                  <TableCell>
                    {port.isPublic ? (
                      <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 gap-1 font-mono">
                        <Globe className="size-2.5" /> Public
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 gap-1 font-mono">
                        <Lock className="size-2.5" /> Isolated
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {port.process} ({port.pid})
                  </TableCell>
                  <TableCell className="text-muted-foreground">{port.service}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
