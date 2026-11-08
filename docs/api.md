# API & Communication Architecture

## 1. Overview

Pratama Server Host communicates with the local host daemon via RESTful endpoints and full-duplex WebSocket connections.

---

## 2. Telemetry Endpoints (REST)

### `GET /api/v1/telemetry/overview`
Retrieves aggregated CPU, memory, NVMe, and network stats.

**Response Structure**:
```json
{
  "cpu": {
    "loadPercentage": 24.5,
    "cores": 4,
    "loadAverage": [1.12, 0.85, 0.60],
    "iowaitPercentage": 1.2,
    "stealPercentage": 0.0
  },
  "memory": {
    "usedBytes": 3650722201,
    "totalBytes": 8376180736,
    "percentage": 43.6,
    "oomRisk": "low"
  },
  "storage": {
    "usedBytes": 45214896128,
    "totalBytes": 128849018880,
    "inodesPercentage": 5.6
  }
}
```

---

## 3. Streaming Endpoints (WebSocket)

### `WSS /api/v1/terminal/pty`
Spawns an interactive pseudo-terminal session (`/dev/pts/*`).
- **Input Frame**: Raw keystrokes or ANSI escape sequences.
- **Output Frame**: Binary or UTF-8 PTY stream.

### `WSS /api/v1/logs/journald`
Streams live systemd journal entries filtered by unit and priority (`-p err..emerg`).

