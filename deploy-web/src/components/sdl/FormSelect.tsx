"use client";
import { RentGpusFormValues, SdlBuilderFormValues } from "@src/types";
import { ProviderAttributeSchemaDetailValue, ProviderAttributesSchema } from "@src/types/providerAttributes";
import { Control, Controller, FieldPath } from "react-hook-form";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { cn } from "@src/utils/styleUtils";
import { Label } from "../ui/label";

type FormSelectProps = {
  control: Control<any, any>;
  providerAttributesSchema: ProviderAttributesSchema;
  optionName?: keyof ProviderAttributesSchema;
  name: FieldPath<SdlBuilderFormValues | RentGpusFormValues>;
  className?: string;
  requiredMessage?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  valueType?: "key" | "description ";
};

export const FormSelect: React.FunctionComponent<FormSelectProps> = ({
  control,
  providerAttributesSchema,
  optionName,
  name,
  className,
  requiredMessage,
  label,
  required = providerAttributesSchema[optionName || ""]?.required || false,
  placeholder,
  disabled,
  valueType = "description"
}) => {
  const options: ProviderAttributeSchemaDetailValue[] = providerAttributesSchema[optionName || ""]?.values || [];

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? requiredMessage : undefined
      }}
      render={({ field, fieldState }) => (
        <div className={cn(className)}>
          <Label>{label}</Label>
          <MultipleSelector
            value={field.value.map(v => ({ value: v.key, label: (valueType === "key" ? v?.key : v?.description) || "" })) || []}
            options={options.map(v => ({ value: v.key, label: (valueType === "key" ? v?.key : v?.description) || "" })) || []}
            hidePlaceholderWhenSelected
            placeholder={placeholder}
            emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            disabled={disabled}
            className="mt-2"
            onChange={(newValue: Option[]) => {
              field.onChange(newValue.map(v => ({ key: v.value, description: v.label })));
            }}
          />
        </div>
      )}
    />
  );
};
