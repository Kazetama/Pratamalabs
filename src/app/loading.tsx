export default function RootLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 rounded-full border-2 border-border border-t-foreground animate-spin" />
        <span className="text-xs font-mono text-muted-foreground">Initializing host interface...</span>
      </div>
    </div>
  );
}

