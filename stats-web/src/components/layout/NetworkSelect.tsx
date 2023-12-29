"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { initiateNetworkData, networks } from "@/store/networkStore";
import { mainnetId } from "@/lib/constants";
import Spinner from "../Spinner";

interface NetworkSelectProps {}

const NetworkSelect: React.FC<NetworkSelectProps> = () => {
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [selectedNetworkId, setSelectedNetworkId] = useState(mainnetId);

  useEffect(() => {
    async function init() {
      await initiateNetworkData();

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
      <SelectTrigger className="h-[30px] min-w-[180px] max-w-[200px]">
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
                    <span className="text-xs text-muted-foreground">{network.version}</span>
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
