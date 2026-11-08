export type SystemdActiveState = "active" | "inactive" | "failed" | "activating" | "deactivating";
export type SystemdLoadState = "loaded" | "not-found" | "bad-setting" | "error" | "masked";

export interface SystemServiceItem {
  id: string;
  name: string;
  description: string;
  loadState: SystemdLoadState;
  activeState: SystemdActiveState;
  subState: string;
  pid?: number;
  memoryBytes?: number;
  cpuPercentage?: number;
}

