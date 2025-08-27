import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwiperButtonsProps {
  prevClassName?: string;
  nextClassName?: string;
}

const SwiperButtons = (props: SwiperButtonsProps) => {
  const { prevClassName, nextClassName } = props;

  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex justify-between items-center !z-[1000] w-full ">
      <Button
        variant="ghost"
        type="button"
        rel="prev"
        size="icon"
        className={cn(
          prevClassName,
          "swiper-button-prev  flex items-center rounded-full !z-[500] !hover:bg-white/90",
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ChevronLeft className="h-8 w-8 text-foreground" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        rel="next"
        size="icon"
        className={cn(
          nextClassName,
          "swiper-button-next flex items-center rounded-full !z-[500] ",
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ChevronRight className="h-8 w-8 text-foreground" />
      </Button>
    </div>
  );
};

export default SwiperButtons;
