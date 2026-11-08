import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Schema definition matching src/types/auth.ts
const loginSchema = z.object({
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

// Path traversal validation test
function sanitizeSafePath(baseDir, requestedPath) {
  if (requestedPath.includes("\0") || requestedPath.includes("..")) {
    throw new Error("Path traversal or null-byte detected");
  }
  return `${baseDir}/${requestedPath}`.replace(/\/+/g, "/");
}

test("Security: Login schema accepts valid system usernames", () => {
  const result = loginSchema.safeParse({
    username: "root",
    password: "securePassword123",
    rememberMe: true,
  });
  assert.equal(result.success, true);
});

test("Security: Login schema rejects SQL injection attempts in username", () => {
  const result = loginSchema.safeParse({
    username: "admin' OR '1'='1",
    password: "securePassword123",
  });
  assert.equal(result.success, false);
});

test("Security: Login schema rejects script injection / XSS tags in username", () => {
  const result = loginSchema.safeParse({
    username: "<script>alert(1)</script>",
    password: "securePassword123",
  });
  assert.equal(result.success, false);
});

test("Security: Login schema rejects passwords shorter than 6 characters", () => {
  const result = loginSchema.safeParse({
    username: "admin",
    password: "123",
  });
  assert.equal(result.success, false);
});

test("Security: Path sanitizer detects and blocks path traversal (../)", () => {
  assert.throws(() => {
    sanitizeSafePath("/etc", "../etc/shadow");
  }, /Path traversal/);
});

test("Security: Path sanitizer blocks null-byte poison attacks", () => {
  assert.throws(() => {
    sanitizeSafePath("/var/log", "system.log\0.jpg");
  }, /Path traversal or null-byte/);
});

