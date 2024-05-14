import getConfig from "next/config";
import { gt, neq } from "semver";
import { mainnetId, sandboxId, testnetId } from "./constants";
const { publicRuntimeConfig } = getConfig();

const migrations = {
  // TODO
  "0.14.0": () => {}
};

// Store latestUpdatedVersion in localStorage
// Check if latestUpdatedVersion is < currentVersion
// If so run all the version > until current is reached.
export const migrateLocalStorage = () => {
  const currentVersion = publicRuntimeConfig?.version;
  let latestUpdatedVersion = localStorage.getItem("latestUpdatedVersion");

  if (!latestUpdatedVersion) {
    // It's an upgrade from an old version
    if (Object.keys(localStorage).some(key => key.endsWith(".data") || key.endsWith(".wallet"))) {
      latestUpdatedVersion = "1.0.0";
    } else {
      // It's a brand new installation
      latestUpdatedVersion = currentVersion;
      localStorage.setItem("selectedNetworkId", mainnetId);
    }
  }

  // Only apply migrations if there was a previous version
  if (latestUpdatedVersion && neq(currentVersion, latestUpdatedVersion)) {
    Object.keys(migrations).forEach(version => {
      if (gt(version, latestUpdatedVersion)) {
        try {
          console.log(`Applying version ${version}`);
          // Execute local storage migration
          migrations[version]();
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  // Update the latestUpdatedVersion
  localStorage.setItem("latestUpdatedVersion", currentVersion);
};

export function extractLocalStorageData() {
  const networks = [mainnetId, testnetId, sandboxId];

  const allKeys = Object.keys(localStorage);
  const filteredKeys = allKeys.filter(key => networks.some(network => key.startsWith(network + "/")));

  return filteredKeys.reduce((acc, key) => ({ ...acc, [key]: localStorage.getItem(key) }), {} as { [key: string]: string });
}
