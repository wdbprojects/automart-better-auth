"use client";

import { ChangeEvent, SelectHTMLAttributes } from "react";
import { cn, syntheticEvent } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  value?: string | null;
  options: { label: string; value: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
  placeholder?: string;
  noDefault?: boolean;
  disabled?: boolean;
}

// const SelectSchema = z.object({
//   fieldName: z.string(),
// });

const SelectComp = (props: SelectProps) => {
  const {
    className,
    label,
    name,
    value,
    options,
    onChange,
    selectClassName,
    placeholder,
    noDefault,
    disabled,
    ...rest
  } = props;

  const form = useForm({
    // resolver: zodResolver(SelectSchema),
  });
  const { handleSubmit, control } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={cn("mt-1 flex-1 w-full", className)}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={control}
            name={name}
            render={({ field }) => {
              return (
                <FormItem className="!space-y-0">
                  <FormLabel className="text-xs text-muted-foreground !mb-0.5 pb-0">
                    {label}
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      onChange(syntheticEvent(value, name, options, onChange));
                    }}
                    defaultValue={field.value}
                    disabled={disabled || false}
                  >
                    <FormControl className="w-full cursor-pointer rounded-full">
                      <SelectTrigger>
                        {noDefault && (
                          <SelectValue placeholder={placeholder || "Select"} />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-sm dark:bg-black">
                      <SelectItem
                        value={""}
                        className="text-muted-foreground cursor-pointer"
                      >
                        {placeholder || "Select"}
                      </SelectItem>
                      {options.map((option) => {
                        return (
                          <SelectItem
                            key={option.value}
                            className="cursor-pointer"
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
};

export default SelectComp;
