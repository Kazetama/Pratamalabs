# Design System Specification

## 1. Design Direction: Clean Premium Monochrome

The Pratama user interface follows a strict **Clean Premium** philosophy:
- **Primary Tone**: Pure White (`#FFFFFF`) / Deep Charcoal (`#09090B`).
- **Accent Highlighting**: Subtle Electric Blue (`#2563EB`) for focused interactions and Emerald (`#10B981`) for health indicators.
- **Typography**: Geist Sans for interface labels; Geist Mono for kernel telemetry, paths, PIDs, and terminal output.
- **Anti-Bloat Principle**: Zero decorative gradient spam, zero neon glassmorphism, zero unnecessary decorative animations. Every visual token conveys operational telemetry status.

---

## 2. Color Tokens

| Token | Light Mode | Dark Mode | Description |
|---|---|---|---|
| `--background` | `#FFFFFF` | `#09090B` | Viewport canvas background |
| `--foreground` | `#09090B` | `#FAFAFA` | Primary high-contrast prose |
| `--card` | `#FFFFFF` | `#121215` | Elevated surface for metrics and tables |
| `--card-foreground` | `#09090B` | `#FAFAFA` | Text on card surfaces |
| `--muted` | `#F4F4F5` | `#27272A` | Secondary button backgrounds, search inputs |
| `--muted-foreground` | `#71717A` | `#A1A1AA` | Labels, timestamps, secondary metrics |
| `--border` | `#E4E4E7` | `#27272A` | Surface dividing strokes |
| `--destructive` | `#E11D48` | `#F43F5E` | Reboot, stop container, delete file actions |

---

## 3. Responsive Breakpoints

- **Mobile (< 640px)**:
  - Sidebar folds into an accessible slide-over sheet drawer (`Sheet`).
  - Metric cards collapse into single-column layout.
  - Interactive tables preserve horizontal scrolling without breaking the layout viewport.
- **Tablet (640px – 1023px)**:
  - Metric cards render in 2-column grid.
  - Header displays condensed host status badges.
- **Desktop (1024px+)**:
  - Left navigation sidebar is fixed with categorized monitoring, applications, tools, and system groups.
  - High information density tables and dual-pane dashboards.

---

## 4. Component Standards

All components are derived from `shadcn/ui` primitives built on `@base-ui/react` and Radix:
- `Card`: Border-outlined, shadow-xs for structured information grouping.
- `Table`: Monospace headers and tabular numeric cells.
- `Badge`: Status pills with semantic colored pulse dots for health monitoring.
- `Dialog`: Accessible modal confirmations with dark overlay backdrop for destructive actions (e.g., node reboot).

