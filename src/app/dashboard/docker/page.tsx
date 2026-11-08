"use client";

import Link from "next/link";
import { Download, Lock, Plus, Square, Trash2 } from "lucide-react";
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
import { usePlugins } from "@/context/plugins-context";

interface ContainerSample {
  id: string;
  name: string;
  image: string;
  status: "running" | "exited";
  ports: string;
  cpu: string;
  memory: string;
}

const SAMPLE_CONTAINERS: ContainerSample[] = [
  {
    id: "c89f1a23",
    name: "caddy-reverse-proxy",
    image: "caddy:2.8.4-alpine",
    status: "running",
    ports: "80:80, 443:443",
    cpu: "0.4%",
    memory: "38.2 MB",
  },
  {
    id: "b41e8c71",
    name: "postgres-primary",
    image: "postgres:16.3-alpine",
    status: "running",
    ports: "127.0.0.1:5432:5432",
    cpu: "1.2%",
    memory: "184.6 MB",
  },
  {
    id: "f9024a18",
    name: "redis-session-cache",
    image: "redis:7.2.5-alpine",
    status: "running",
    ports: "127.0.0.1:6379:6379",
    cpu: "0.1%",
    memory: "18.5 MB",
  },
];

export default function DockerPage() {
  const { isPluginInstalled } = usePlugins();
  const isDockerActive = isPluginInstalled("docker");

  if (!isDockerActive) {
    return (
      <div className="space-y-6">
        <div className="pb-2 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Docker Management
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Container lifecycle, Docker compose stacks, image pruning, and volume inspectors
          </p>
        </div>

        <Card className="bg-card text-card-foreground border-border p-8 sm:p-14 flex flex-col items-center justify-center min-h-[420px] text-center shadow-xs border-dashed">
          <div className="size-14 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4 shadow-xs">
            <Lock className="size-7 text-muted-foreground" />
          </div>
          <Badge variant="outline" className="border-border text-muted-foreground font-mono text-[10px] uppercase mb-2">
            Plugin Required
          </Badge>
          <CardTitle className="text-lg font-bold text-foreground">
            Docker Plugin Not Installed
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground max-w-md mt-1 leading-relaxed">
            Docker Engine &amp; Compose orchestration are currently locked. Download and activate the Docker plugin from the Plugins manager to start deploying containerized services.
          </CardDescription>

          <Link href="/dashboard/plugins" className="mt-5">
            <Button size="sm" className="gap-2 text-xs font-medium cursor-pointer">
              <Download className="size-3.5" />
              <span>Go to Plugins Manager</span>
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Docker Management
            </h2>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[10px] font-mono">
              Engine Active
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Container lifecycle, Docker compose stacks, image pruning, and volume inspectors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1.5 cursor-pointer">
            <Trash2 className="size-3.5" /> Prune Unused
          </Button>
          <Button size="sm" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Plus className="size-3.5" /> Deploy Container
          </Button>
        </div>
      </div>

      {/* Container Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Running Containers</span>
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              {SAMPLE_CONTAINERS.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Stopped / Exited</span>
              <span className="size-2 rounded-full bg-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              0
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Total Images</span>
              <Badge variant="outline" className="text-[10px] border-border font-mono">Docker Engine</Badge>
            </div>
            <CardTitle className="text-2xl font-bold font-mono mt-1 text-foreground">
              8
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Active Containers Table */}
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                Active Containers
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Realtime container execution state and resource consumption
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              compose-v2
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-mono">ID</TableHead>
                <TableHead className="text-xs font-mono">Name</TableHead>
                <TableHead className="text-xs font-mono">Image</TableHead>
                <TableHead className="text-xs font-mono">Ports</TableHead>
                <TableHead className="text-xs font-mono">CPU</TableHead>
                <TableHead className="text-xs font-mono">Memory</TableHead>
                <TableHead className="text-xs font-mono text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_CONTAINERS.map((container) => (
                <TableRow key={container.id} className="border-border text-xs font-mono">
                  <TableCell className="text-muted-foreground">{container.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{container.name}</TableCell>
                  <TableCell className="text-muted-foreground">{container.image}</TableCell>
                  <TableCell className="text-muted-foreground">{container.ports}</TableCell>
                  <TableCell className="text-foreground">{container.cpu}</TableCell>
                  <TableCell className="text-foreground">{container.memory}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="xs" className="h-7 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer">
                      <Square className="size-3 mr-1" /> Stop
                    </Button>
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
