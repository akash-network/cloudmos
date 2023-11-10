import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { uAktDenom } from "@src/utils/constants";
import { EncodeObject } from "@cosmjs/proto-signing";
import { useSnackbar } from "notistack";
import { Snackbar } from "@src/components/shared/Snackbar";
import { customRegistry } from "@src/utils/customRegistry";
import { TransactionModal } from "@src/components/layout/TransactionModal";
import { OpenInNew } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { event } from "nextjs-google-analytics";
import { AnalyticsEvents } from "@src/utils/analytics";
import { useRouter } from "next/router";
import { UrlService } from "@src/utils/urlUtils";
import { useSettings } from "../SettingsProvider";
import axios from "axios";
import { LinkTo } from "@src/components/shared/LinkTo";
import { useUsdcDenom } from "@src/hooks/useDenom";
import { getSelectedNetwork } from "@src/hooks/useSelectedNetwork";
import { LocalWalletDataType } from "@src/utils/walletUtils";
import { useSelectedChain } from "../CustomChainProvider";

type Balances = {
  uakt: number;
  usdc: number;
};

type ContextType = {
  address: string;
  walletName: string;
  walletBalances: Balances;
  isWalletConnected: boolean;
  isWalletLoaded: boolean;
  connectWallet: () => Promise<void>;
  logout: () => void;
  setIsWalletLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  signAndBroadcastTx: (msgs: EncodeObject[]) => Promise<any>;
  refreshBalances: (address?: string) => Promise<Balances>;
};

const WalletProviderContext = React.createContext<ContextType>({
  address: null,
  walletName: null,
  walletBalances: null,
  isWalletConnected: false,
  isWalletLoaded: false,
  connectWallet: null,
  logout: null,
  setIsWalletLoaded: null,
  signAndBroadcastTx: null,
  refreshBalances: null
});

export const WalletProvider = ({ children }) => {
  const [walletBalances, setWalletBalances] = useState<Balances>(null);
  const [isWalletLoaded, setIsWalletLoaded] = useState<boolean>(true);
  const [isBroadcastingTx, setIsBroadcastingTx] = useState<boolean>(false);
  const [isWaitingForApproval, setIsWaitingForApproval] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sigingClient = useRef<SigningStargateClient>(null);
  const router = useRouter();
  const { settings } = useSettings();
  const usdcIbcDenom = useUsdcDenom();
  const { sign, disconnect, getOfflineSigner, isWalletConnected, address: walletAddress, connect, username, estimateFee, broadcast } = useSelectedChain();

  useEffect(() => {
    if (settings?.rpcEndpoint && sigingClient.current) {
      sigingClient.current = null;
    }
  }, [settings?.rpcEndpoint]);

  async function createStargateClient() {
    const selectedNetwork = getSelectedNetwork();

    const offlineSigner = getOfflineSigner();
    let rpc = settings?.rpcEndpoint ? settings?.rpcEndpoint : selectedNetwork.rpcEndpoint;

    try {
      await axios.get(`${rpc}/abci_info`);
    } catch (error) {
      // If the rpc node has cors enabled, switch to the backup rpc cosmos.directory
      if (error.code === "ERR_NETWORK" || error?.response?.status === 0) {
        rpc = selectedNetwork.rpcEndpoint;
      }
    }

    const client = await SigningStargateClient.connectWithSigner(rpc, offlineSigner, {
      registry: customRegistry,
      broadcastTimeoutMs: 300_000 // 5min
    });

    return client;
  }

  async function getStargateClient() {
    if (!sigingClient.current) {
      sigingClient.current = await createStargateClient();
    }

    return sigingClient.current;
  }

  function logout(): void {
    setWalletBalances(null);
    disconnect();

    event(AnalyticsEvents.DISCONNECT_WALLET, {
      category: "wallet",
      label: "Disconnect wallet"
    });

    router.push(UrlService.home());
  }

  async function connectWallet(): Promise<void> {
    console.log("Connecting wallet with CosmosKit...");
    connect();

    await loadWallet();

    event(AnalyticsEvents.CONNECT_WALLET, {
      category: "wallet",
      label: "Connect wallet"
    });
  }

  useEffect(() => {
    if (walletAddress) {
      router.push(UrlService.home());

      loadWallet();
    }
  }, [walletAddress]);

  async function loadWallet(): Promise<void> {
    const selectedNetwork = getSelectedNetwork();
    const storageWallets = JSON.parse(localStorage.getItem(`${selectedNetwork.id}/wallets`)) as LocalWalletDataType[];

    let currentWallets = storageWallets ?? [];

    if (!currentWallets.some(x => x.address === walletAddress)) {
      currentWallets.push({ name: username, address: walletAddress, selected: true });
    }

    currentWallets = currentWallets.map(x => ({ ...x, selected: x.address === walletAddress }));

    localStorage.setItem(`${selectedNetwork.id}/wallets`, JSON.stringify(currentWallets));

    await refreshBalances();

    setIsWalletLoaded(true);
  }

  async function signAndBroadcastTx(msgs: EncodeObject[]): Promise<boolean> {
    setIsWaitingForApproval(true);
    let pendingSnackbarKey = null;
    try {
      const estimatedFees = await estimateFee(msgs, "stargate", "", 1.25);

      const txRaw = await sign(msgs, estimatedFees);

      setIsWaitingForApproval(false);
      setIsBroadcastingTx(true);
      pendingSnackbarKey = enqueueSnackbar(<Snackbar title="Broadcasting transaction..." subTitle="Please wait a few seconds" showLoading />, {
        variant: "info",
        autoHideDuration: null
      });

      const txResult = await broadcast(txRaw);

      setIsBroadcastingTx(false);

      if (txResult.code !== 0) {
        throw new Error(txResult.rawLog);
      }

      showTransactionSnackbar("Transaction success!", "", txResult.transactionHash, "success");

      event(AnalyticsEvents.SUCCESSFUL_TX, {
        category: "transactions",
        label: "Successful transaction"
      });

      await refreshBalances();

      return true;
    } catch (err) {
      console.error(err);

      const transactionHash = err.txHash;
      let errorMsg = "An error has occured";

      if (err.message.includes("was submitted but was not yet found on the chain")) {
        errorMsg = "Transaction timeout";
      } else {
        try {
          const reg = /Broadcasting transaction failed with code (.+?) \(codespace: (.+?)\)/i;
          const match = err.message.match(reg);
          const log = err.message.substring(err.message.indexOf("Log"), err.message.length);

          if (match) {
            const code = parseInt(match[1]);
            const codeSpace = match[2];

            if (codeSpace === "sdk") {
              const errorMessages = {
                5: "Insufficient funds",
                9: "Unknown address",
                11: "Out of gas",
                12: "Memo too large",
                13: "Insufficient fee",
                19: "Tx already in mempool",
                25: "Invalid gas adjustment"
              };

              if (code in errorMessages) {
                errorMsg = errorMessages[code];
              }
            }
          }

          if (log) {
            errorMsg += `. ${log}`;
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (!errorMsg.includes("Request rejected")) {
        event(AnalyticsEvents.FAILED_TX, {
          category: "transactions",
          label: "Failed transaction"
        });
      }

      showTransactionSnackbar("Transaction has failed...", errorMsg, transactionHash, "error");

      return false;
    } finally {
      if (pendingSnackbarKey) {
        closeSnackbar(pendingSnackbarKey);
      }

      setIsWaitingForApproval(false);
      setIsBroadcastingTx(false);
    }
  }

  const showTransactionSnackbar = (
    snackTitle: string,
    snackMessage: string,
    transactionHash: string,
    snackVariant: React.ComponentProps<typeof Snackbar>["iconVariant"]
  ) => {
    enqueueSnackbar(
      <Snackbar
        title={snackTitle}
        subTitle={<TransactionSnackbarContent snackMessage={snackMessage} transactionHash={transactionHash} />}
        iconVariant={snackVariant}
      />,
      {
        variant: snackVariant,
        autoHideDuration: 10000
      }
    );
  };

  async function refreshBalances(address?: string): Promise<{ uakt: number; usdc: number }> {
    const _address = address || walletAddress;
    const client = await getStargateClient();

    if (client) {
      const balances = await client.getAllBalances(_address);
      const uaktBalance = balances.find(b => b.denom === uAktDenom);
      const usdcBalance = balances.find(b => b.denom === usdcIbcDenom);

      const walletBalances = {
        uakt: uaktBalance ? parseInt(uaktBalance.amount) : 0,
        usdc: usdcBalance ? parseInt(usdcBalance.amount) : 0
      };

      setWalletBalances(walletBalances);

      return walletBalances;
    } else {
      return {
        uakt: 0,
        usdc: 0
      };
    }
  }

  return (
    <WalletProviderContext.Provider
      value={{
        address: walletAddress,
        walletName: username,
        walletBalances,
        isWalletConnected: isWalletConnected,
        isWalletLoaded,
        connectWallet,
        logout,
        setIsWalletLoaded,
        signAndBroadcastTx,
        refreshBalances
      }}
    >
      {children}

      <TransactionModal open={isWaitingForApproval || isBroadcastingTx} state={isWaitingForApproval ? "waitingForApproval" : "broadcasting"} />
    </WalletProviderContext.Provider>
  );
};

// Hook
export function useWallet() {
  return { ...React.useContext(WalletProviderContext) };
}

const TransactionSnackbarContent = ({ snackMessage, transactionHash }) => {
  const theme = useTheme();
  const txUrl = transactionHash && UrlService.transaction(transactionHash);

  return (
    <>
      {snackMessage}
      {snackMessage && <br />}
      {txUrl && (
        <LinkTo
          sx={{ display: "flex", alignItems: "center", color: `${theme.palette.success.contrastText}!important` }}
          onClick={() => window.open(txUrl, "_blank")}
        >
          View transaction <OpenInNew sx={{ fontSize: "1rem", marginLeft: ".5rem" }} />
        </LinkTo>
      )}
    </>
  );
};
