# Security Architecture & Threat Model

## 1. Core Security Principles

Pratama Server Host controls root-level or privileged host resources. As such, the application adopts a zero-trust model:
- **Never trust client payloads**: All inputs (usernames, passwords, file paths, daemon ports) are validated server-side and client-side using strict Zod schemas.
- **Path Traversal Defense**: The File Manager validates paths against directory boundaries to prevent `../` or null-byte (`%00`) injection into unauthorized system directories.
- **Server Fingerprint Elimination**: The `X-Powered-By` header is disabled in `next.config.ts` to prevent disclosing Next.js and Node.js version signatures to automated vulnerability scanners.

---

## 2. HTTP Security Headers

Configured via `next.config.ts`:

- `X-Frame-Options: DENY`: Prevents UI redressing and clickjacking by forbidding embedding inside `<iframe>` or `<frame>`.
- `X-Content-Type-Options: nosniff`: Instructs user-agents not to override declared MIME types.
- `Referrer-Policy: strict-origin-when-cross-origin`: Restricts referrer information leakage to cross-origin destinations.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`: Disables browser hardware APIs that are unnecessary for server administration.

---

## 3. Authentication & Route Guarding

- **Session Token**: Authenticated sessions are encapsulated in cryptographically structured tokens stored in `HttpOnly` / `SameSite=Lax` cookies.
- **Edge / Server Proxy (`src/proxy.ts`)**: Evaluates every inbound request targeting `/dashboard/:path*`. If the session token is missing or expired, the request is immediately aborted and redirected to the login endpoint.
- **Input Sanitization**: Login fields enforce strict regexes (`^[a-zA-Z0-9_.-]+$`) to prevent injection attacks.

