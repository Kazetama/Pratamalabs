# Pratama Server Host

> Lightweight, secure, and modern self-hosted Linux server management & telemetry web panel built with Next.js 16, TypeScript, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## Overview

**Pratama Server Host** is a self-hosted host management interface designed for direct deployment on Linux VPS, dedicated nodes, and bare-metal servers. It delivers a fast, low-footprint alternative to traditional control panels, prioritizing strict security, high information density, and zero bloated templates.

### Key Capabilities

- **Real-Time Telemetry**: CPU load averages, iowait/steal metrics, memory pressure, swap utilization, NVMe I/O latency, and inode consumption.
- **Process Supervision**: Kernel-level `/proc` process inspector ranking active system tasks by memory and CPU consumption.
- **Web Terminal**: Interactive browser-based pseudo-terminal (PTY) session over WebSocket with ANSI terminal emulation.
- **Systemd Unit Manager**: Inspect, start, stop, and restart background daemons (`sshd`, `caddy`, `docker`, `cron`).
- **Network & Socket Exposure Matrix**: Audit listening ports (`ss -tulpn`) distinguishing between public interfaces (`0.0.0.0`) and isolated loopbacks (`127.0.0.1`), integrated with UFW firewall status.
- **POSIX File Explorer**: Navigate directory structures, audit permissions (`chmod`/`chown`), and download or edit configuration files.
- **Decoupled Plugin Architecture**: Extend host functionality with modular runtimes and databases (Docker Engine, Caddy, PostgreSQL, Redis, Node.js, Python) with dynamic navigation unlocking.
- **Clean Premium Theme**: Monochrome black-and-white visual identity with automatic Light, Dark, and System theme synchronization.

---

## Architecture & Directory Layout

```
src/
├── app/                  # Next.js App Router (pages, layouts, error boundaries)
│   ├── dashboard/        # Authenticated server control modules
│   │   ├── docker/       # Container management
│   │   ├── files/        # POSIX file manager
│   │   ├── logs/         # Journald incident stream
│   │   ├── network/      # Listening ports & firewall
│   │   ├── plugins/      # Host extensions catalog
│   │   ├── services/     # Systemd unit manager
│   │   ├── settings/     # Daemon preferences
│   │   └── terminal/     # Web PTY terminal
│   └── page.tsx          # Authentication entrypoint
├── components/           # Reusable UI primitives
│   ├── layout/           # DashboardHeader, DashboardSidebar
│   └── ui/               # shadcn/ui components (Card, Table, Dialog, Sheet)
├── config/               # Navigation, plugins catalog, site metadata
├── context/              # Reactive contexts (PluginsProvider)
├── features/             # Domain feature modules (Auth, Telemetry)
├── lib/                  # Utilities (clsx/twMerge cn, session auth)
├── proxy.ts              # Next.js request proxy & route security guard
└── types/                # Domain TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or 22.x LTS
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/pratamalabs/server-host.git
cd server-host

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to access the login interface.

---

## Quality & Verification

Every pull request and build must pass standard checks:

```bash
# Type check without emission
npm run typecheck

# Code quality and hook validation
npm run lint

# Production build
npm run build
```

---

## Security Policy

- **Route Guarding**: All `/dashboard/*` endpoints are intercepted at the server level via `src/proxy.ts`. Unauthenticated requests are immediately redirected to the login gateway.
- **Input Sanitization**: User inputs are strictly validated against `zod` schemas.
- **Security Headers**: Production builds inject `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Server Privacy**: The `X-Powered-By` header is stripped to eliminate technology fingerprinting.

For security reports, please refer to [docs/security.md](docs/security.md).

---

## Documentation

Comprehensive architectural and design specifications are located in the `docs/` directory:

- [docs/architecture.md](docs/architecture.md) — System topology and communication patterns
- [docs/design-system.md](docs/design-system.md) — Color tokens, typography, and responsive breakpoints
- [docs/security.md](docs/security.md) — Threat model, proxy rules, and input validation
- [docs/api.md](docs/api.md) — Telemetry REST schemas and WebSocket streams
- [docs/development-guide.md](docs/development-guide.md) — Developer setup, coding rules, and conventions

---

## License

This project is licensed under the [MIT License](LICENSE).
