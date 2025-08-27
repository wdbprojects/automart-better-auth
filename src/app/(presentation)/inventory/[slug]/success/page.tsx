import DarkMode from "@/components/shared/dark-mode";
import EndButtons from "@/modules/components/single-classified-comps/end-buttons";
import { CircleCheck } from "lucide-react";

const SuccessReservationPage = () => {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheck className="size-16 mx-auto text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Reservation Confirmed!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your reservation. We'll see you soon
        </p>
        <EndButtons />
        <div className="mt-6 flex items-center justify-center">
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default SuccessReservationPage;
