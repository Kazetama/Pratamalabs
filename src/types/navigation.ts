import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  requirePlugin?: string;
  badge?: string;
}

export interface NavSection {
  category: string;
  items: NavItem[];
}

