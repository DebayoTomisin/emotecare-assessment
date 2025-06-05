import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";
import { useCalendarStore } from "@/store/useCalendarStore";
import { Button } from "@headlessui/react";

export const Controls = () => {
  const { currentDate, setCurrentDate, view } = useCalendarStore();

  const handlePrevious = () => {
    const newDate =
      view === "month"
        ? subMonths(currentDate, 1)
        : view === "week"
        ? subWeeks(currentDate, 1)
        : subDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate =
      view === "month"
        ? addMonths(currentDate, 1)
        : view === "week"
        ? addWeeks(currentDate, 1)
        : addDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex items-center gap-x-3">
      <Button onClick={handlePrevious} className="cursor-pointer">
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button onClick={handleNext} className="cursor-pointer">
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
