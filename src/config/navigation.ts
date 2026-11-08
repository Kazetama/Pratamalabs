import {
  Blocks,
  Cpu,
  FileText,
  FolderTree,
  Layers,
  LayoutDashboard,
  Network,
  Settings,
  Terminal,
} from "lucide-react";
import type { NavSection } from "@/types/navigation";

export const NAV_SECTIONS: NavSection[] = [
  {
    category: "Monitoring",
    items: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "System Services",
        href: "/dashboard/services",
        icon: Cpu,
      },
      {
        title: "Network & Firewall",
        href: "/dashboard/network",
        icon: Network,
      },
      {
        title: "Logs & Audits",
        href: "/dashboard/logs",
        icon: FileText,
      },
    ],
  },
  {
    category: "Applications",
    items: [
      {
        title: "Docker",
        href: "/dashboard/docker",
        icon: Layers,
        requirePlugin: "docker",
      },
    ],
  },
  {
    category: "Tools",
    items: [
      {
        title: "Manage File",
        href: "/dashboard/files",
        icon: FolderTree,
      },
      {
        title: "Terminal Web",
        href: "/dashboard/terminal",
        icon: Terminal,
      },
      {
        title: "Plugins",
        href: "/dashboard/plugins",
        icon: Blocks,
      },
    ],
  },
  {
    category: "System",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/files": "File Manager",
  "/dashboard/docker": "Docker Containers",
  "/dashboard/terminal": "Web Terminal",
  "/dashboard/plugins": "Plugins & Extensions",
  "/dashboard/services": "System Services",
  "/dashboard/network": "Network & Firewall",
  "/dashboard/logs": "Logs & Incident Audit",
  "/dashboard/settings": "Host Settings",
};

