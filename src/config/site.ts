export const SITE_CONFIG = {
  name: "Pratama Server Host",
  shortName: "Pratama Node",
  description: "Self-hosted Linux server management & telemetry web panel",
  version: "1.0.0",
  defaultNode: {
    id: "node-prod-01",
    ipAddress: "103.111.42.10",
    os: "Ubuntu 24.04 LTS",
    kernel: "Linux 6.8.0-45-generic",
    port: 8443,
  },
} as const;

