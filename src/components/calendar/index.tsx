import { useCalendarStore } from "@/store/useCalendarStore";
import { MonthView } from "./month-view";
import WeekView from "./week-view";
import DayView from "./day-view";

export const Calendar = () => {
  const view = useCalendarStore((s) => s.view);

  if (view === "month") return <MonthView />;
  if (view === "week") return <WeekView />;
  if (view === "day") return <DayView />;
};
