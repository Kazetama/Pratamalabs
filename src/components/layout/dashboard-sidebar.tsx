"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Lock, LogOut, Server } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePlugins } from "@/context/plugins-context";
import { NAV_SECTIONS } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

interface SidebarNavProps {
  onItemClick?: () => void;
}

export function SidebarNavContent({ onItemClick }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isPluginInstalled } = usePlugins();

  const handleLogout = () => {
    if (onItemClick) onItemClick();
    document.cookie = `${SESSION_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    router.push("/");
    router.refresh();
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 text-zinc-700 dark:text-zinc-300 font-sans overflow-hidden">
      <div className="space-y-4 overflow-y-auto pr-1 -mr-1">
        {/* Node Identity */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="size-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Server className="size-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm text-zinc-950 dark:text-white tracking-tight leading-none truncate">
              {SITE_CONFIG.shortName}
            </span>
            <span className="text-[11px] font-mono text-zinc-500 mt-1 truncate">
              {SITE_CONFIG.defaultNode.id}
            </span>
          </div>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-900" />

        {/* Navigation Sections */}
        <div className="space-y-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.category} className="space-y-1">
              <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                {section.category}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isLocked = item.requirePlugin && !isPluginInstalled(item.requirePlugin);
                  const isActive =
                    !isLocked &&
                    (item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href));

                  if (isLocked) {
                    return (
                      <Link
                        key={item.href}
                        href="/dashboard/plugins"
                        onClick={onItemClick}
                        title={`Install ${item.title} plugin first`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon className="size-4 shrink-0 opacity-50" />
                          <span className="truncate opacity-70">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Lock className="size-3 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
                          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">Locked</span>
                        </div>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onItemClick}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs"
                          : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900/80"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Node Status & Logout */}
      <div className="space-y-2.5 pt-3 border-t border-zinc-200 dark:border-zinc-900 shrink-0">
        <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-600 dark:bg-zinc-900/60 dark:border-zinc-900 dark:text-zinc-400">
          <div className="flex items-center gap-2 truncate">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">{SITE_CONFIG.defaultNode.ipAddress}</span>
          </div>
          <span className="text-zinc-500 shrink-0">Online</span>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 text-xs h-9 cursor-pointer"
        >
          <LogOut className="size-4 shrink-0" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex w-64 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 flex-col shrink-0 sticky top-0 z-30 transition-colors">
      <SidebarNavContent />
    </aside>
  );
}
