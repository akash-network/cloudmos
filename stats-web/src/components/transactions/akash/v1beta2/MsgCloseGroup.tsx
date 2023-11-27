import { TransactionMessage } from "@/types";
import { UrlService } from "@/lib/urlUtils";
import { AddressLink } from "@/components/AddressLink";
import Link from "next/link";
import { LabelValue } from "../../../LabelValue";

type TxMessageProps = {
  message: TransactionMessage;
};

export const MsgCloseGroup: React.FunctionComponent<TxMessageProps> = ({ message }) => {
  return (
    <>
      <LabelValue label="Owner" value={<AddressLink address={message?.data?.id?.owner} />} />
      <LabelValue
        label="dseq"
        value={<Link href={UrlService.publicDeploymentDetails(message?.data?.id?.owner, message?.data?.id?.dseq)}>{message?.data?.id?.dseq}</Link>}
      />
      <LabelValue label="gseq" value={message?.data?.id?.gseq} />
    </>
  );
};
