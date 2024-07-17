"use client";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedDate } from "react-intl";
import {
  Alert,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  Popup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@akashnetwork/ui/components";
import { addYears, format } from "date-fns";
import { event } from "nextjs-google-analytics";

import { LinkTo } from "@src/components/shared/LinkTo";
import { useWallet } from "@src/context/WalletProvider";
import { getUsdcDenom, useUsdcDenom } from "@src/hooks/useDenom";
import { useDenomData } from "@src/hooks/useWalletBalance";
import { GrantType } from "@src/types/grant";
import { AnalyticsEvents } from "@src/utils/analytics";
import { uAktDenom } from "@src/utils/constants";
import { denomToUdenom } from "@src/utils/mathHelpers";
import { aktToUakt, coinToDenom } from "@src/utils/priceUtils";
import { TransactionMessageData } from "@src/utils/TransactionMessageData";
import { handleDocClick } from "@src/utils/urlUtils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  address: string;
  editingGrant?: GrantType | null;
  onClose: () => void;
};

const supportedTokens = [
  { id: "akt", label: "AKT" },
  { id: "usdc", label: "USDC" }
];

const formSchema = z.object({
  token: z.string({
    message: "Token is required."
  }),
  amount: z.number({
    message: "Amount is required."
  }),
  expiration: z
    .string({
      message: "Expiration is required."
    })
    .date(),
  useDepositor: z.boolean(),
  granteeAddress: z.string({ message: "Grantee address is required." })
});

export const GrantModal: React.FunctionComponent<Props> = ({ editingGrant, address, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const { signAndBroadcastTx } = useWallet();
  const usdcDenom = useUsdcDenom();
  const { handleSubmit, control, watch, clearErrors, setValue } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      token: editingGrant ? (editingGrant.authorization.spend_limit.denom === usdcDenom ? "usdc" : "akt") : "akt",
      amount: editingGrant ? coinToDenom(editingGrant.authorization.spend_limit) : 0,
      expiration: format(addYears(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
      useDepositor: false,
      granteeAddress: editingGrant?.grantee ?? ""
    },
    resolver: zodResolver(formSchema)
  });
  const { amount, granteeAddress, expiration, token } = watch();
  const selectedToken = supportedTokens.find(x => x.id === token);
  const denom = token === "akt" ? uAktDenom : usdcDenom;
  const denomData = useDenomData(denom);

  const onDepositClick = event => {
    event.preventDefault();
    formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const onSubmit = async ({ amount, expiration, granteeAddress }: z.infer<typeof formSchema>) => {
    setError("");
    clearErrors();
    const spendLimit = token === "akt" ? aktToUakt(amount) : denomToUdenom(amount);
    const usdcDenom = getUsdcDenom();
    const denom = token === "akt" ? uAktDenom : usdcDenom;

    const expirationDate = new Date(expiration);
    const message = TransactionMessageData.getGrantMsg(address, granteeAddress, spendLimit, expirationDate, denom);
    const response = await signAndBroadcastTx([message]);

    if (response) {
      event(AnalyticsEvents.AUTHORIZE_SPEND, {
        category: "deployments",
        label: "Authorize wallet to spend on deployment deposits"
      });

      onClose();
    }
  };

  const onBalanceClick = () => {
    clearErrors();
    setValue("amount", denomData?.inputMax || 0);
  };

  return (
    <Popup
      fullWidth
      open
      variant="custom"
      actions={[
        {
          label: "Cancel",
          color: "primary",
          variant: "text",
          side: "left",
          onClick: onClose
        },
        {
          label: "Grant",
          color: "secondary",
          variant: "default",
          side: "right",
          disabled: !amount,
          onClick: onDepositClick
        }
      ]}
      onClose={onClose}
      maxWidth="sm"
      enableCloseOnBackdropClick
      title="Authorize Spending"
    >
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Alert
          className="mb-4"
          // severity="info"
        >
          <p className="text-sm text-muted-foreground">
            <LinkTo onClick={ev => handleDocClick(ev, "https://akash.network/docs/network-features/authorized-spend/")}>Authorized Spend</LinkTo> allows users
            to authorize spending of a set number of tokens from a source wallet to a destination, funded wallet. The authorized spend is restricted to Akash
            deployment activities and the recipient of the tokens would not have access to those tokens for other operations.
          </p>
        </Alert>

        <div className="mb-2 mt-2 text-right">
          <LinkTo onClick={() => onBalanceClick()}>
            Balance: {denomData?.balance} {denomData?.label}
          </LinkTo>
        </div>

        <div className="mb-4 flex w-full flex-row items-center">
          <FormField
            control={control}
            name="token"
            render={({ field }) => {
              return (
                <div>
                  <FormLabel htmlFor="grant-address">Token</FormLabel>
                  <Select value={field.value || ""} onValueChange={field.onChange}>
                    <SelectTrigger id="grant-address">
                      <SelectValue placeholder="Select grant token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {supportedTokens.map(token => (
                          <SelectItem key={token.id} value={token.id}>
                            {token.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </div>
              );
            }}
          />

          <FormField
            control={control}
            name="amount"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  type="number"
                  label="Spending Limit"
                  autoFocus
                  min={0}
                  step={0.000001}
                  max={denomData?.inputMax}
                  startIcon={denomData?.label}
                  className="ml-4 flex-grow"
                />
              );
            }}
          />
        </div>

        <div className="mb-4 w-full">
          <FormField
            control={control}
            name="granteeAddress"
            render={({ field }) => {
              return <FormInput {...field} type="text" label="Grantee Address" disabled={!!editingGrant} />;
            }}
          />
        </div>

        <div className="mb-4 w-full">
          <FormField
            control={control}
            name="expiration"
            render={({ field }) => {
              return <FormInput {...field} type="datetime-local" label="Expiration" />;
            }}
          />
        </div>

        {!!amount && granteeAddress && (
          <Alert
          // severity="info"
          >
            <p className="text-sm text-muted-foreground">
              This address will be able to spend up to {amount} {selectedToken?.label} on your behalf ending on{" "}
              <FormattedDate value={expiration} year="numeric" month="2-digit" day="2-digit" hour="2-digit" minute="2-digit" />.
            </p>
          </Alert>
        )}

        {error && <Alert variant="warning">{error}</Alert>}
      </form>
    </Popup>
  );
};
