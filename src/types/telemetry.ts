export interface CpuMetrics {
  loadPercentage: number;
  cores: number;
  loadAverage: [number, number, number];
  iowaitPercentage: number;
  stealPercentage: number;
}

export interface MemoryMetrics {
  usedBytes: number;
  totalBytes: number;
  percentage: number;
  swapUsedBytes: number;
  swapTotalBytes: number;
  oomRisk: "low" | "medium" | "high";
}

export interface StorageMetrics {
  usedBytes: number;
  totalBytes: number;
  mountPoint: string;
  inodesPercentage: number;
  writeLatencyMs: number;
}

export interface NetworkMetrics {
  rxBytesPerSec: number;
  txBytesPerSec: number;
  establishedSockets: number;
  synRecvSockets: number;
  interfaceName: string;
}

export interface HostNodeInfo {
  hostname: string;
  ipAddress: string;
  osRelease: string;
  kernelVersion: string;
  uptimeSeconds: number;
  status: "healthy" | "degraded" | "offline";
}

