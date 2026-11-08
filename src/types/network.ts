export type SocketProtocol = "tcp" | "tcp6" | "udp" | "udp6";

export interface ListeningPort {
  id: string;
  protocol: SocketProtocol;
  address: string;
  port: number;
  process: string;
  pid: number;
  isPublic: boolean;
  service?: string;
}

export interface FirewallRule {
  id: string;
  action: "ALLOW" | "DENY" | "REJECT";
  from: string;
  toPort: string;
  protocol: "tcp" | "udp" | "any";
  comment?: string;
}

