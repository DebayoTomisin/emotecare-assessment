import { DateDisplay } from "./date-display";
import { Controls } from "./controls";
import { Logo } from "./logo";
import { ViewSelector } from "./view-selector";
import { Button } from "@headlessui/react";
import { startOfToday } from "date-fns";
import { useCalendarStore } from "@/store/useCalendarStore";

export const CalendarHeader = () => {
  const setCurrentDate = useCalendarStore((s) => s.setCurrentDate);
  return (
    <header className="w-full sticky top-0 px-4 py-3 flex  sm:flex-row items-center justify-between">
      <div className="flex items-center gap-x-4">
        <Logo />
        <div className="ml-3 md:ml-7 flex items-center gap-8">
          <Controls />
          <Button
            className="hidden md:block border-[0.98px] rounded-full text-base px-5 cursor-pointer hover:bg-gray-200 transition-colors duration-200 h-[48px]"
            onClick={() => setCurrentDate(startOfToday())}
          >
            Today
          </Button>
          <DateDisplay />
        </div>
      </div>
      <ViewSelector />
    </header>
  );
};
