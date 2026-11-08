import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username cannot exceed 32 characters")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Username may only contain letters, numbers, dots, dashes, and underscores"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot exceed 128 characters"),
  rememberMe: z.boolean().default(true),
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthSession {
  userId: string;
  username: string;
  role: "root" | "admin" | "operator";
  nodeId: string;
  expiresAt: number;
}

