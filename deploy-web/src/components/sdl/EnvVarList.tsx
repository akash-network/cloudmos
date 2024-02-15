"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Service } from "@src/types";
import { CustomTooltip } from "../shared/CustomTooltip";
import { FormPaper } from "./FormPaper";
import { InfoCircle } from "iconoir-react";

type Props = {
  currentService: Service;
  serviceIndex?: number;
  children?: ReactNode;
  setIsEditingEnv: Dispatch<SetStateAction<boolean | number>>;
};

// const useStyles = makeStyles()(theme => ({
//   editLink: {
//     color: theme.palette.secondary.light,
//     textDecoration: "underline",
//     cursor: "pointer",
//     fontWeight: "normal",
//     fontSize: ".8rem"
//   },
//   formValue: {
//     color: theme.palette.grey[500]
//   }
// }));

export const EnvVarList: React.FunctionComponent<Props> = ({ currentService, setIsEditingEnv, serviceIndex }) => {
  return (
    <FormPaper className="px-4 py-2">
      <div className="mb-2 flex items-center">
        <p>
          <strong>Environment Variables</strong>
        </p>

        <CustomTooltip
          title={
            <>
              A list of environment variables to expose to the running container.
              <br />
              <br />
              <a href="https://docs.akash.network/readme/stack-definition-language#services.env" target="_blank" rel="noopener">
                View official documentation.
              </a>
            </>
          }
        >
          <InfoCircle className="ml-4 text-sm text-muted-foreground" />
        </CustomTooltip>

        <span
          className="ml-4 cursor-pointer text-sm font-normal text-primary-foreground underline"
          onClick={() => setIsEditingEnv(serviceIndex !== undefined ? serviceIndex : true)}
        >
          Edit
        </span>
      </div>

      {(currentService.env?.length || 0) > 0 ? (
        currentService.env?.map((e, i) => (
          <div key={i} className="text-xs">
            {e.key}=<span className="text-muted-foreground">{e.value}</span>
          </div>
        ))
      ) : (
        <p className="text-xs text-muted-foreground">None</p>
      )}
    </FormPaper>
  );
};
