"use client";

import { ChangeEvent, SelectHTMLAttributes } from "react";
import { FilterOptions } from "@/config/types";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
  noDefault?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const SelectCompOrig = (props: SelectProps) => {
  const {
    label,
    value,
    options,
    onChange,
    className,
    selectClassName,
    noDefault = true,
    disabled,
    placeholder = "Select...",
    ...rest
  } = props;

  return (
    <div className={cn("mt-1 flex-1 w-full", className)}>
      {label && (
        <h4 className="text-xs text-muted-foreground font-medium mb-1.5">
          {label}
        </h4>
      )}

      <div className="mt-0 flex items-center gap-2 justify-between">
        <select
          onChange={onChange}
          value={value ?? ""}
          disabled={disabled}
          className={cn(
            "main-select-class",
            "custom-select",
            "disabled:!bg-muted disabled:!cursor-default",
          )}
          {...rest}
        >
          {noDefault && <option value="">{placeholder}</option>}
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectCompOrig;
