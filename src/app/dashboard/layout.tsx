import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PluginsProvider } from "@/context/plugins-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PluginsProvider>
      <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden transition-colors">
        {/* Left Sidebar (Desktop Only: lg and above) */}
        <DashboardSidebar />

        {/* Main Content Area (Mobile, Tablet, Laptop, Desktop) */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-zinc-950 overflow-x-hidden transition-colors">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </main>
        </div>
      </div>
    </PluginsProvider>
  );
}
