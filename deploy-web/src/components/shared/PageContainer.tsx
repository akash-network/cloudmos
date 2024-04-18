"use client";
import { cn } from "@src/utils/styleUtils";
import { ReactNode } from "react";
import { LinearLoadingSkeleton } from "./LinearLoadingSkeleton";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useWallet } from "@src/context/WalletProvider";
import { useSettings } from "@src/context/SettingsProvider";
import Spinner from "./Spinner";

type Props = {
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
  isUsingSettings?: boolean;
  isUsingWallet?: boolean;
};

export const PageContainer: React.FunctionComponent<Props> = ({ children, className = "", isLoading, isUsingSettings, isUsingWallet }) => {
  const { isSettingsInit } = useSettings();
  const { isWalletLoaded } = useWallet();

  return (
    <div className={cn(className)}>
      {isLoading !== undefined && <LinearLoadingSkeleton isLoading={isLoading} />}

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {!isUsingSettings || isSettingsInit ? (
          !isUsingWallet || isWalletLoaded ? (
            <div className="container h-full pb-8 pt-4 sm:pt-8">{children}</div>
          ) : (
            <Loading text="Loading wallet..." />
          )
        ) : (
          <Loading text="Loading settings..." />
        )}
      </ErrorBoundary>
    </div>
  );
};

const Loading: React.FunctionComponent<{ text: string }> = ({ text }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pb-12 pt-12">
      <div className="pb-4">
        <Spinner size="large" />
      </div>
      <div>
        <h5>{text}</h5>
      </div>
    </div>
  );
};
