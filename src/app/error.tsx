"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full p-6 rounded-2xl bg-card border border-border shadow-xl text-center space-y-4">
        <div className="size-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle className="size-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            System Interface Error
          </h2>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            An unexpected error occurred while communicating with the host daemon.
          </p>
        </div>
        {error.digest && (
          <div className="p-2 rounded bg-muted font-mono text-[10px] text-muted-foreground truncate">
            Digest: {error.digest}
          </div>
        )}
        <Button
          onClick={reset}
          size="sm"
          className="gap-2 text-xs font-medium cursor-pointer mx-auto"
        >
          <RotateCcw className="size-3.5" />
          <span>Reload Interface</span>
        </Button>
      </div>
    </div>
  );
}

