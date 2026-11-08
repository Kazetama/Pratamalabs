import Link from "next/link";
import { ArrowLeft, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full p-8 rounded-2xl bg-card border border-border shadow-xl text-center space-y-4">
        <div className="size-12 rounded-xl bg-muted border border-border text-muted-foreground flex items-center justify-center mx-auto">
          <ServerCrash className="size-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            404 — Endpoint Not Found
          </h2>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            The requested server route or dashboard endpoint does not exist on this host daemon.
          </p>
        </div>
        <Link href="/dashboard" className="inline-block pt-2">
          <Button size="sm" variant="outline" className="gap-2 text-xs font-medium cursor-pointer">
            <ArrowLeft className="size-3.5" />
            <span>Return to Overview</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

