"use client";

import React, { createContext, useContext, useState } from "react";

interface PluginsContextType {
  installedPlugins: string[];
  installPlugin: (pluginId: string) => Promise<void>;
  uninstallPlugin: (pluginId: string) => void;
  isPluginInstalled: (pluginId: string) => boolean;
  installingId: string | null;
}

const PluginsContext = createContext<PluginsContextType | undefined>(undefined);

const STORAGE_KEY = "pratama_installed_plugins";

export function PluginsProvider({ children }: { children: React.ReactNode }) {
  const [installedPlugins, setInstalledPlugins] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [installingId, setInstallingId] = useState<string | null>(null);

  const savePlugins = (plugins: string[]) => {
    setInstalledPlugins(plugins);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plugins));
    } catch {
      // Ignore write errors in private browsing
    }
  };

  const installPlugin = async (pluginId: string) => {
    setInstallingId(pluginId);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const next = Array.from(new Set([...installedPlugins, pluginId]));
    savePlugins(next);
    setInstallingId(null);
  };

  const uninstallPlugin = (pluginId: string) => {
    const next = installedPlugins.filter((id) => id !== pluginId);
    savePlugins(next);
  };

  const isPluginInstalled = (pluginId: string) => {
    return installedPlugins.includes(pluginId);
  };

  return (
    <PluginsContext.Provider
      value={{
        installedPlugins,
        installPlugin,
        uninstallPlugin,
        isPluginInstalled,
        installingId,
      }}
    >
      {children}
    </PluginsContext.Provider>
  );
}

export function usePlugins() {
  const context = useContext(PluginsContext);
  if (!context) {
    throw new Error("usePlugins must be used within a PluginsProvider");
  }
  return context;
}
