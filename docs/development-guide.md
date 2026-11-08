# Development & Contribution Guide

## 1. Prerequisites

- **Node.js**: `v20.x` or `v22.x` LTS
- **Package Manager**: `npm` (v10+)
- **Operating System**: Linux (Ubuntu 22.04+ / Debian 12 / AlmaLinux 9 recommended for native host integration), macOS, or Windows 11 with WSL2.

---

## 2. Quickstart

```bash
# Clone the repository
git clone https://github.com/pratamalabs/server-host.git
cd server-host

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Open local development instance
# Visit http://localhost:3000
```

---

## 3. Available NPM Scripts

- `npm run dev`: Runs Next.js with local hot module reloading.
- `npm run build`: Generates an optimized production build using Turbopack.
- `npm run start`: Launches the compiled production server.
- `npm run lint`: Executes ESLint to check for stylistic and React 19 hook issues.
- `npm run typecheck`: Validates complete TypeScript type safety without generating emit files.

---

## 4. Code Style & Architecture Rules

1. **Separation of Concerns**: Never place database queries or privileged host execution commands inside presentational client components.
2. **Type Safety**: Strictly avoid `any`. Define and export interfaces in `src/types/`.
3. **Components**: Use `shadcn/ui` primitives with semantic styling tokens (`bg-card`, `text-card-foreground`, `border-border`).
4. **Validation**: All user-submitted mutations must be verified against Zod schemas.
5. **Responsiveness**: Every layout must support mobile devices (< 640px), tablets (640px–1023px), and desktop monitors (1024px+).

