"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const FormHeader = () => {
  const params = useSearchParams();
  const steps = [
    { id: "1", title: "Welcome" },
    { id: "2", title: "Select Handover Date" },
    { id: "3", title: "Submit Details" },
  ];

  return (
    <div className="p-4 flex justify-between bg-sidebar shadow-sm rounded-lg mt-4 w-auto md:min-w-[650px]">
      <div className="flex flex-col justify-between flex-1">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-foreground">
          {
            steps.find(({ id }) => {
              return params.get("step") === id;
            })?.title
          }
        </h1>
      </div>
      <div className="flex items-center justify-end gap-3 text-sm font-medium text-muted-foreground flex-1">
        <div className={cn("rounded-full flex items-center justify-center")}>
          {steps.map((step) => {
            return (
              <div
                key={step.id}
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center",
                  params.get("step") === step.id &&
                    "bg-primary text-primary-foreground dark:text-white",
                )}
              >
                {step.id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
