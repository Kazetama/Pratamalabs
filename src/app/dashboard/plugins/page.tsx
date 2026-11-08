"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Lock,
  Search,
  Trash2,
  Unlock,
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
import { Input } from "@/components/ui/input";
import { usePlugins } from "@/context/plugins-context";
import { AVAILABLE_PLUGINS } from "@/config/plugins";
import { PluginInstallModal } from "@/features/plugins";
import type { PluginItem } from "@/types/plugin";

export default function PluginsPage() {
  const { installedPlugins, installPlugin, uninstallPlugin, isPluginInstalled } =
    usePlugins();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "installed" | "available">("all");
  const [modalPlugin, setModalPlugin] = useState<PluginItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPlugins = AVAILABLE_PLUGINS.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.category.toLowerCase().includes(searchQuery.toLowerCase());

    const isInstalled = isPluginInstalled(plugin.id);

    if (selectedFilter === "installed") return matchesSearch && isInstalled;
    if (selectedFilter === "available") return matchesSearch && !isInstalled;
    return matchesSearch;
  });

  const handleOpenInstall = (plugin: PluginItem) => {
    setModalPlugin(plugin);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Plugins &amp; Extensions
            </h2>
            <Badge variant="outline" className="border-border bg-card text-foreground text-xs font-mono">
              {installedPlugins.length} Installed
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Install and manage host server runtimes, databases, and application orchestrators
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-muted rounded-lg w-fit text-xs font-medium">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Plugins ({AVAILABLE_PLUGINS.length})
          </button>
          <button
            onClick={() => setSelectedFilter("available")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              selectedFilter === "available"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Available ({AVAILABLE_PLUGINS.length - installedPlugins.length})
          </button>
          <button
            onClick={() => setSelectedFilter("installed")}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              selectedFilter === "installed"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Installed ({installedPlugins.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="size-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plugins..."
            className="h-8 pl-8 text-xs bg-background border-border text-foreground w-full"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlugins.map((plugin) => {
          const Icon = plugin.icon;
          const isInstalled = isPluginInstalled(plugin.id);

          return (
            <Card
              key={plugin.id}
              className={`bg-card text-card-foreground border-border shadow-xs flex flex-col justify-between transition-all hover:border-zinc-400 dark:hover:border-zinc-700 ${
                isInstalled ? "ring-1 ring-border" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground shrink-0 shadow-xs">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {plugin.category}
                    </Badge>
                    <span className="text-muted-foreground">{plugin.version}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span>{plugin.name}</span>
                    {plugin.unlocksRoute && (
                      <span title={isInstalled ? "Unlocked in sidebar" : "Locked in sidebar"}>
                        {isInstalled ? (
                          <Unlock className="size-3.5 text-emerald-500" />
                        ) : (
                          <Lock className="size-3.5 text-muted-foreground" />
                        )}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                    {plugin.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-0 border-t border-border mt-auto pt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Size: {plugin.size}
                </span>

                <div className="flex items-center gap-2">
                  {isInstalled ? (
                    <>
                      {plugin.unlocksRoute && (
                        <Link href={plugin.unlocksRoute}>
                          <Button size="xs" variant="outline" className="text-xs h-7 gap-1">
                            Open
                          </Button>
                        </Link>
                      )}
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => uninstallPlugin(plugin.id)}
                        className="text-xs h-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                        title="Uninstall plugin"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="xs"
                      onClick={() => handleOpenInstall(plugin)}
                      className="text-xs h-7 gap-1.5 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Download className="size-3.5" />
                      <span>Install Plugin</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Auto-Install & VPS Manual Guide Modal */}
      <PluginInstallModal
        plugin={modalPlugin}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onInstallComplete={(pluginId) => {
          installPlugin(pluginId);
        }}
      />
    </div>
  );
}
