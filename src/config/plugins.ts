import { Blocks, Globe, Layers, Server } from "lucide-react";
import type { PluginItem } from "@/types/plugin";

export const AVAILABLE_PLUGINS: PluginItem[] = [
  {
    id: "docker",
    name: "Docker Engine",
    category: "Container",
    version: "v26.1.1",
    description:
      "Enterprise container runtime & Docker Compose for building, shipping, and running containerized apps.",
    icon: Layers,
    size: "142 MB",
    unlocksRoute: "/dashboard/docker",
    serviceName: "docker.service",
    installCommands: [
      "curl -fsSL https://get.docker.com | sh",
      "systemctl enable --now docker",
      "usermod -aG docker root",
      "docker --version && docker compose version",
    ],
  },
  {
    id: "caddy",
    name: "Caddy Web Server",
    category: "Web Server",
    version: "v2.8.4",
    description:
      "Modern HTTP/2 & HTTP/3 reverse proxy with automated Let's Encrypt TLS certificate provisioning.",
    icon: Globe,
    size: "48 MB",
    serviceName: "caddy.service",
    installCommands: [
      "apt-get install -y debian-keyring debian-archive-keyring apt-transport-https",
      "curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg",
      "apt-get update -qq && apt-get install -y caddy",
      "systemctl enable --now caddy",
    ],
  },
  {
    id: "postgres",
    name: "PostgreSQL Database",
    category: "Database",
    version: "v16.3",
    description:
      "Powerful open-source object-relational database system with high reliability and ACID compliance.",
    icon: Server,
    size: "185 MB",
    serviceName: "postgresql.service",
    installCommands: [
      "apt-get install -y postgresql-common",
      "/usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y",
      "apt-get update -qq && apt-get install -y postgresql-16",
      "systemctl enable --now postgresql",
    ],
  },
  {
    id: "redis",
    name: "Redis Cache Store",
    category: "Database",
    version: "v7.2.5",
    description:
      "High-performance in-memory key-value data structure store used for caching and session management.",
    icon: Server,
    size: "24 MB",
    serviceName: "redis-server.service",
    installCommands: [
      "curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg",
      "apt-get update -qq && apt-get install -y redis",
      "systemctl enable --now redis-server",
    ],
  },
  {
    id: "nodejs",
    name: "Node.js LTS Runtime",
    category: "Runtime",
    version: "v20.14.0",
    description:
      "JavaScript runtime built on Chrome's V8 engine with npm and core development tools.",
    icon: Blocks,
    size: "95 MB",
    installCommands: [
      "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -",
      "apt-get install -y nodejs",
      "node -v && npm -v",
    ],
  },
  {
    id: "python",
    name: "Python 3.12 Stack",
    category: "Runtime",
    version: "v3.12.3",
    description:
      "Standard Python environment pre-packaged with pip, setuptools, and virtualenv manager.",
    icon: Blocks,
    size: "78 MB",
    installCommands: [
      "apt-get update -qq && apt-get install -y python3.12 python3-pip python3.12-venv",
      "python3 --version && pip3 --version",
    ],
  },
];
