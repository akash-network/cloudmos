"use client";
import React, { useEffect, useState } from "react";

import Spinner from "../Spinner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { mainnetId, setNetworkVersion } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { initiateNetworkData, networks } from "@/store/networkStore";

interface NetworkSelectProps {
  className?: string;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ className }) => {
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [selectedNetworkId, setSelectedNetworkId] = useState(mainnetId);

  useEffect(() => {
    async function init() {
      await initiateNetworkData();
      setNetworkVersion();

      const selectedNetworkId = localStorage.getItem("selectedNetworkId");
      if (selectedNetworkId) {
        setSelectedNetworkId(selectedNetworkId);
      }

      setIsLoadingSettings(false);
    }

    init();
  }, []);

  const onSelectNetworkChange = (networkId: string) => {
    setSelectedNetworkId(networkId);

    // Set in the settings and local storage
    localStorage.setItem("selectedNetworkId", networkId);
    // Reset the ui to reload the settings for the currently selected network

    location.reload();
  };

  return (
    <Select value={selectedNetworkId} disabled={isLoadingSettings} onValueChange={onSelectNetworkChange}>
      <SelectTrigger className={cn("h-[30px] min-w-[180px] max-w-[200px]", className)}>
        {isLoadingSettings && <Spinner size="small" />}
        <SelectValue placeholder="Select network" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {networks.map(network => {
            return (
              <SelectItem key={network.id} disabled={!network.enabled} value={network.id}>
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {network.title}
                    {" - "}
                    <span className="text-muted-foreground text-xs">{network.version}</span>
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NetworkSelect;
