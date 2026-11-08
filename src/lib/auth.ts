import type { AuthSession } from "@/types/auth";
import { SITE_CONFIG } from "@/config/site";

export const SESSION_COOKIE_NAME = "pratama_session";
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function createSessionToken(username: string): string {
  const sessionData: AuthSession = {
    userId: `usr_${Math.random().toString(36).substring(2, 10)}`,
    username,
    role: username === "root" ? "root" : "admin",
    nodeId: SITE_CONFIG.defaultNode.id,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  return btoa(JSON.stringify(sessionData));
}

export function parseSessionToken(token: string | undefined): AuthSession | null {
  if (!token) return null;
  try {
    const raw = atob(token);
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed.expiresAt < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

