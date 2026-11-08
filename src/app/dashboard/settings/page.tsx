"use client";

import { useState } from "react";
import { Check, Save, Server, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SITE_CONFIG } from "@/config/site";

export default function SettingsPage() {
  const [port, setPort] = useState(SITE_CONFIG.defaultNode.port.toString());
  const [autoTls, setAutoTls] = useState(true);
  const [enablePty, setEnablePty] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("24");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Host Settings
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Agent daemon port, security tokens, system users, and TLS preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {savedSuccess && (
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs font-mono gap-1">
              <Check className="size-3" /> Saved Successfully
            </Badge>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            className="text-xs font-medium gap-1.5 cursor-pointer"
          >
            <Save className="size-3.5" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Daemon Network Configuration */}
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Server className="size-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold text-foreground">
                Daemon Interface
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Control socket binding and communication ports for host-agent
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="node-id" className="text-xs font-medium text-foreground">
                  Node Identifier
                </Label>
                <Input
                  id="node-id"
                  defaultValue={SITE_CONFIG.defaultNode.id}
                  disabled
                  className="h-9 text-xs font-mono bg-muted border-border text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="agent-port" className="text-xs font-medium text-foreground">
                  Agent Listening Port
                </Label>
                <Input
                  id="agent-port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  type="number"
                  className="h-9 text-xs font-mono bg-background border-border text-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Policies */}
        <Card className="bg-card text-card-foreground border-border shadow-xs">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold text-foreground">
                Security &amp; Encryption
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              TLS encryption certificates and authentication token rules
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="space-y-0.5">
                <Label className="text-xs font-medium text-foreground">
                  Automated TLS / HTTPS Provisioning
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Issue and auto-renew TLS certificates using Let&apos;s Encrypt ACME provider
                </p>
              </div>
              <Switch checked={autoTls} onCheckedChange={setAutoTls} />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="space-y-0.5">
                <Label className="text-xs font-medium text-foreground">
                  Web Terminal (PTY Shell) Access
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Allow interactive terminal emulator execution through WebSocket proxy
                </p>
              </div>
              <Switch checked={enablePty} onCheckedChange={setEnablePty} />
            </div>

            <div className="space-y-1.5 pt-1">
              <Label htmlFor="session-timeout" className="text-xs font-medium text-foreground">
                Session Expiration (Hours)
              </Label>
              <Input
                id="session-timeout"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                type="number"
                min="1"
                max="720"
                className="h-9 w-36 text-xs font-mono bg-background border-border text-foreground"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
