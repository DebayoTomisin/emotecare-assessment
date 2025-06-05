import { useCalendarStore } from "@/store/useCalendarStore";
import { format, endOfWeek, isSameMonth, startOfWeek } from "date-fns";

export const DateDisplay = () => {
  const { currentDate, view } = useCalendarStore();

  if (view === "day") {
    return (
      <h2 className="hidden md:block  text-lg font-medium">
        {format(currentDate, "MMMM d, yyyy")}
      </h2>
    );
  }

  if (view === "week") {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const sameMonth = isSameMonth(start, end);

    const label = sameMonth
      ? format(start, "MMMM yyyy")
      : `${format(start, "MMMM")} – ${format(end, "MMMM yyyy")}`;

    return <h2 className="hidden md:block text-lg font-medium">{label}</h2>;
  }

  return (
    <h2 className="hidden md:block  text-lg font-medium">
      {format(currentDate, "MMMM yyyy")}
    </h2>
  );
};
