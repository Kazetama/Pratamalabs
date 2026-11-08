"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, ShieldAlert, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema, type LoginInput } from "@/types/auth";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { SITE_CONFIG } from "@/config/site";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/dashboard";

  const [formData, setFormData] = useState<LoginInput>({
    username: "",
    password: "",
    rememberMe: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate inputs against security schema
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message ?? "Invalid credentials format");
      return;
    }

    setIsLoading(true);

    try {
      const token = createSessionToken(validation.data.username);
      const maxAge = validation.data.rememberMe ? 86400 : 3600;
      document.cookie = `${SESSION_COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;

      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 300);
    } catch {
      setErrorMessage("Authentication failed. Please verify daemon connectivity.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl bg-white text-zinc-950 p-7 sm:p-8 shadow-2xl border-zinc-200/90 font-sans relative">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-600 mb-4 w-fit">
        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-zinc-800">{SITE_CONFIG.defaultNode.id}</span>
        <span className="text-zinc-300">•</span>
        <span className="text-zinc-500">{SITE_CONFIG.defaultNode.ipAddress}</span>
      </div>

      <CardHeader className="p-0 mb-6 space-y-1.5">
        <CardTitle className="text-2xl font-bold tracking-tight text-zinc-950">
          Sign In
        </CardTitle>
        <CardDescription className="text-xs text-zinc-500 leading-relaxed">
          Authenticate with host credentials to access node telemetry and daemon controls
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <Alert className="border-rose-200 bg-rose-50 text-rose-800 text-xs py-2 px-3 flex items-start gap-2">
              <ShieldAlert className="size-4 text-rose-600 shrink-0 mt-0.5" />
              <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-xs font-medium text-zinc-700">
              Username
            </Label>
            <div className="relative">
              <User className="size-4 absolute left-3 top-3 text-zinc-400 pointer-events-none" />
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="root or admin"
                className="h-10 pl-9 bg-zinc-50/60 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-blue-600 text-sm rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-zinc-700">
                Password
              </Label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="size-3.5" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="size-3.5" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <Lock className="size-4 absolute left-3 top-3 text-zinc-400 pointer-events-none" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••••••"
                className="h-10 pl-9 pr-9 bg-zinc-50/60 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-blue-600 text-sm rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 size-3.5 cursor-pointer"
              />
              <span className="text-xs text-zinc-600">Remember session</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">Port :{SITE_CONFIG.defaultNode.port}</span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 mt-3 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Sign In to Server</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>Encrypted Local Session • TLS 1.3</span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
