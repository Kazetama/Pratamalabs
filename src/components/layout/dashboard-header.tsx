"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Clock, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarNavContent } from "@/components/layout/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { PAGE_TITLES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

export function DashboardHeader() {
  const pathname = usePathname();
  const currentTitle = PAGE_TITLES[pathname] || "Dashboard";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-14 bg-background/90 backdrop-blur-md border-b border-border px-4 sm:px-6 flex items-center justify-between font-sans text-foreground">
      {/* Mobile Hamburger Trigger & Breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger render={
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-9 text-muted-foreground hover:text-foreground hover:bg-accent shrink-0 cursor-pointer"
              aria-label="Open mobile navigation"
            />
          }>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-background border-r border-border text-foreground">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarNavContent onItemClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-sm font-semibold text-foreground tracking-tight truncate">
            {currentTitle}
          </h1>
          <span className="hidden sm:inline text-muted-foreground font-mono text-xs">/</span>
          <span className="hidden sm:inline text-xs font-mono text-muted-foreground truncate">
            {SITE_CONFIG.defaultNode.id}
          </span>
        </div>
      </div>

      {/* Node Telemetry & Theme Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono shrink-0">
        <div className="hidden md:flex items-center gap-2 text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          <span>Uptime: <strong className="text-foreground">14d 6h</strong></span>
        </div>

        <Badge variant="outline" className="border-border bg-muted/50 text-foreground text-[10px] sm:text-[11px] gap-1.5 py-0.5 px-2">
          <span className="size-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span className="hidden sm:inline">Healthy</span>
        </Badge>

        <ThemeToggle />
      </div>
    </header>
  );
}
