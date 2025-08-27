"use client";

import { FilterOptions } from "@/config/types";
import { SelectHTMLAttributes } from "react";
import { options } from "sanitize-html";

interface SelectType extends SelectHTMLAttributes<HTMLSelectElement> {
  options: FilterOptions<string, number>;
}

interface RangeSelectProps {
  label: string;
  minSelect: SelectType;
  maxSelect: SelectType;
}

const SelectRange = (props: RangeSelectProps) => {
  const { label, minSelect, maxSelect } = props;

  return (
    <>
      <h4 className="text-xs text-muted-foreground font-medium mb-1.5">
        {label}
      </h4>
      <div className="mt-0 flex items-center gap-2 justify-between">
        <select
          {...minSelect}
          className="rounded-full disabled:!bg-gray-800 dark:disabled:!bg-gray-700 flex-1 w-full px-3 py-1.75 border-input border focus:outline-hidden !pr-[20px] cursor-pointer hover:!bg-muted-foreground/5 appearance-none custom-select !text-muted-foreground"
        >
          <option value="">Select</option>
          {minSelect.options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        <select
          {...maxSelect}
          className="rounded-full disabled:!bg-gray-800 dark:disabled:!bg-gray-700 flex-1 w-full px-3 py-1.75 border-input border focus:outline-hidden !pr-[20px] cursor-pointer hover:!bg-muted-foreground/5 appearance-none custom-select !text-muted-foreground"
        >
          <option value="">Select</option>
          {maxSelect.options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default SelectRange;
