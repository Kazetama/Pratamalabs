import { Suspense } from "react";
import { LoginForm, LoginVisualPanel } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-zinc-950 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Authentication Form Column */}
      <section className="lg:col-span-5 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 bg-zinc-950 border-r border-zinc-900 relative z-20">
        <div className="absolute size-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <Suspense fallback={<div className="w-full max-w-sm h-96 rounded-2xl bg-white animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </section>

      {/* Visual Telemetry Column */}
      <section className="hidden lg:col-span-7 lg:block relative bg-zinc-950 overflow-hidden">
        <LoginVisualPanel />
      </section>
    </main>
  );
}
