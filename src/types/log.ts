export type LogSeverity = "emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug";

export interface JournalLogEntry {
  id: string;
  timestamp: string;
  unit: string;
  severity: LogSeverity;
  message: string;
  pid?: number;
}

