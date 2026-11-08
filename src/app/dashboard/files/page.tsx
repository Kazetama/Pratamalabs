"use client";

import { useState } from "react";
import {
  Download,
  FileCode,
  FileText,
  Folder,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
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
import type { FileEntry } from "@/types/file";

const INITIAL_FILES: FileEntry[] = [
  {
    name: "nginx.conf",
    path: "/etc/nginx/nginx.conf",
    isDirectory: false,
    sizeBytes: 2450,
    permissions: "-rw-r--r--",
    owner: "root",
    group: "root",
    modifiedAt: "2026-11-04 14:22",
  },
  {
    name: "docker-compose.yml",
    path: "/opt/stack/docker-compose.yml",
    isDirectory: false,
    sizeBytes: 1820,
    permissions: "-rw-r--r--",
    owner: "root",
    group: "docker",
    modifiedAt: "2026-11-06 09:15",
  },
  {
    name: "ssl",
    path: "/etc/ssl",
    isDirectory: true,
    sizeBytes: 4096,
    permissions: "drwx------",
    owner: "root",
    group: "root",
    modifiedAt: "2026-10-29 11:00",
  },
  {
    name: "hosts",
    path: "/etc/hosts",
    isDirectory: false,
    sizeBytes: 384,
    permissions: "-rw-r--r--",
    owner: "root",
    group: "root",
    modifiedAt: "2026-11-01 16:40",
  },
  {
    name: ".env.production",
    path: "/var/www/app/.env.production",
    isDirectory: false,
    sizeBytes: 940,
    permissions: "-rw-------",
    owner: "www-data",
    group: "www-data",
    modifiedAt: "2026-11-07 20:30",
  },
];

export default function FileManagerPage() {
  const [currentPath] = useState("/etc");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = INITIAL_FILES.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            File Manager
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Browse directory tree, configure permissions (chmod/chown), and manage host configuration files
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="text-xs gap-1.5 cursor-pointer">
            <Upload className="size-3.5" /> Upload File
          </Button>
          <Button size="sm" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Plus className="size-3.5" /> New File
          </Button>
        </div>
      </div>

      {/* Directory Path Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-card border border-border text-xs font-mono shadow-xs">
        <div className="flex items-center gap-2 text-foreground truncate">
          <span className="text-muted-foreground shrink-0">Working Directory:</span>
          <span className="px-2 py-0.5 rounded bg-muted border border-border text-foreground font-semibold truncate">
            {currentPath}
          </span>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="size-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="h-8 pl-8 text-xs bg-background border-border text-foreground w-full"
          />
        </div>
      </div>

      {/* File Explorer Table */}
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                Directory Contents
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                {filteredFiles.length} item(s) found in {currentPath}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-mono">Name</TableHead>
                <TableHead className="text-xs font-mono">Permissions</TableHead>
                <TableHead className="text-xs font-mono">Owner / Group</TableHead>
                <TableHead className="text-xs font-mono">Size</TableHead>
                <TableHead className="text-xs font-mono">Modified</TableHead>
                <TableHead className="text-xs font-mono text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.name} className="border-border text-xs font-mono">
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {file.isDirectory ? (
                        <Folder className="size-4 text-blue-500 fill-blue-500/20 shrink-0" />
                      ) : file.name.endsWith(".conf") || file.name.endsWith(".yml") ? (
                        <FileCode className="size-4 text-zinc-400 shrink-0" />
                      ) : (
                        <FileText className="size-4 text-zinc-400 shrink-0" />
                      )}
                      <span className="truncate">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{file.permissions}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {file.owner}:{file.group}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {file.isDirectory ? "-" : `${(file.sizeBytes / 1024).toFixed(1)} KB`}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{file.modifiedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Download file"
                      >
                        <Download className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                        title="Delete file"
                      >
                        <Trash2 className="size-3.5" />
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
