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
  },
];

