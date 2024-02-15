"use client";
import { ReactNode } from "react";
import { RentGpusFormValues, SdlBuilderFormValues, Service } from "@src/types";
import { CustomTooltip } from "../shared/CustomTooltip";
import { FormPaper } from "./FormPaper";
import { Control, Controller } from "react-hook-form";
import { ProviderAttributesSchema } from "@src/types/providerAttributes";
import { gpuVendors } from "../shared/akash/gpu";
import { FormSelect } from "./FormSelect";
import { validationConfig } from "../shared/akash/units";
import { cn } from "@src/utils/styleUtils";
import { FormControl, FormDescription } from "../ui/form";
import { Slider } from "../ui/slider";
import Spinner from "../shared/Spinner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { InfoCircle } from "iconoir-react";
import { MdSpeed } from "react-icons/md";

type Props = {
  serviceIndex: number;
  hasGpu: boolean;
  hideHasGpu?: boolean;
  children?: ReactNode;
  control: Control<SdlBuilderFormValues | RentGpusFormValues, any>;
  providerAttributesSchema: ProviderAttributesSchema;
  currentService: Service;
};

// const useStyles = makeStyles()(theme => ({
//   formControl: {
//     marginBottom: theme.spacing(1.5)
//   },
//   textField: {
//     width: "100%"
//   }
// }));

export const GpuFormControl: React.FunctionComponent<Props> = ({ providerAttributesSchema, control, serviceIndex, hasGpu, currentService, hideHasGpu }) => {
  return (
    <FormPaper
      className={cn({ ["px-4 pb-4 pt-2"]: hasGpu, ["px-4 py-2"]: !hasGpu })}
      // sx={{ padding: hasGpu ? ".5rem 1rem 1rem" : ".5rem 1rem" }}
    >
      <Controller
        control={control}
        name={`services.${serviceIndex}.profile.gpu`}
        rules={{
          validate: v => {
            if (!v) return "GPU amount is required.";

            const _value = v || 0;

            if (_value < 1) return "GPU amount must be greater than 0.";
            else if (currentService.count === 1 && _value > validationConfig.maxGpuAmount) {
              return `Maximum amount of GPU for a single service instance is ${validationConfig.maxGpuAmount}.`;
            } else if (currentService.count > 1 && currentService.count * _value > validationConfig.maxGroupGpuCount) {
              return `Maximum total amount of GPU for a single service instance group is ${validationConfig.maxGroupGpuCount}.`;
            }
            return true;
          }
        }}
        render={({ field, fieldState }) => (
          <FormControl
          // className={cx(classes.formControl, classes.textField)}
          // variant="standard"
          // sx={{ marginBottom: "0 !important" }}
          // error={!!fieldState.error}
          >
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="flex items-center text-sm">
                  <MdSpeed className="mr-2 text-muted-foreground" />
                  <strong>GPU</strong>

                  <CustomTooltip
                    title={
                      <>
                        The amount of GPUs required for this workload.
                        <br />
                        <br />
                        You can also specify the GPU vendor and model you want specifically. If you don't specify any model, providers with any GPU model will
                        bid on your workload.
                        <br />
                        <br />
                        <a href="https://docs.akash.network/testnet/example-gpu-sdls/specific-gpu-vendor" target="_blank" rel="noopener">
                          View official documentation.
                        </a>
                      </>
                    }
                  >
                    <InfoCircle className="ml-4 text-sm text-muted-foreground" />
                  </CustomTooltip>
                </div>

                {!hideHasGpu && (
                  <Controller
                    control={control}
                    name={`services.${serviceIndex}.profile.hasGpu`}
                    render={({ field }) => <Checkbox checked={field.value} onChange={field.onChange} color="secondary" className="ml-2" />}
                  />
                )}
              </div>

              {hasGpu && (
                <div className="ml-4">
                  <Input
                    type="number"
                    // variant="outlined"
                    // color="secondary"
                    value={field.value || ""}
                    // error={!!fieldState.error}
                    onChange={event => field.onChange(parseFloat(event.target.value))}
                    // inputProps={{ min: 1, step: 1, max: validationConfig.maxGpuAmount }}
                    min={1}
                    step={1}
                    max={validationConfig.maxGpuAmount}
                    // size="small"
                    className="w-[100px]"
                    // sx={{ width: "100px" }}
                  />
                </div>
              )}
            </div>

            {hasGpu && (
              <Slider
                value={[field.value || 0]}
                min={1}
                max={validationConfig.maxGpuAmount}
                step={1}
                color="secondary"
                aria-label="GPUs"
                // valueLabelDisplay="auto"
                onValueChange={newValue => field.onChange(newValue)}
              />
            )}

            {!!fieldState.error && <FormDescription>{fieldState.error.message}</FormDescription>}
          </FormControl>
        )}
      />

      {hasGpu && (
        <div>
          <div className="mt-4">
            <Controller
              control={control}
              name={`services.${serviceIndex}.profile.gpuVendor`}
              rules={{ required: "GPU vendor is required." }}
              defaultValue=""
              render={({ field }) => (
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" className="ml-1 w-[75px]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {gpuVendors.map(t => {
                        return (
                          <SelectItem key={t.id} value={t.value}>
                            {t.value}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                // <Select value={field.value || ""} onChange={field.onChange} variant="outlined" fullWidth size="small" MenuProps={{ disableScrollLock: true }}>
                //   {gpuVendors.map(u => (
                //     <MenuItem key={u.id} value={u.value}>
                //       {u.value}
                //     </MenuItem>
                //   ))}
                // </Select>
              )}
            />
          </div>

          <div className="mt-4">
            {providerAttributesSchema ? (
              <FormSelect
                control={control}
                label="GPU models (any if empty)"
                optionName="hardware-gpu-model"
                name={`services.${serviceIndex}.profile.gpuModels`}
                providerAttributesSchema={providerAttributesSchema}
                required={false}
                multiple
              />
            ) : (
              <div className="flex items-center">
                <Spinner size="small" />
                <span className="ml-2 text-xs text-muted-foreground">Loading GPU models...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </FormPaper>
  );
};
