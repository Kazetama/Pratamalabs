import type { LucideIcon } from "lucide-react";

export type PluginCategory = "Runtime" | "Database" | "Web Server" | "Container";

export interface PluginItem {
  id: string;
  name: string;
  category: PluginCategory;
  version: string;
  description: string;
  icon: LucideIcon;
  size: string;
  unlocksRoute?: string;
  status?: "available" | "installing" | "installed";
}

