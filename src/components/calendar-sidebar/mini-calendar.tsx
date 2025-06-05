import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";
import { useEffect, useState } from "react";
import { useCalendarStore } from "@/store/useCalendarStore";
import clsx from "clsx";

export const MiniCalendar = () => {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const setCurrentDate = useCalendarStore((s) => s.setCurrentDate);

  const [viewDate, setViewDate] = useState(() => startOfMonth(currentDate));

  useEffect(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);

    const isOutside = isBefore(currentDate, start) || isAfter(currentDate, end);

    if (isOutside) {
      setViewDate(startOfMonth(currentDate));
    }
  }, [currentDate, viewDate]);

  const handleMonthNav = (offset: number) => {
    setViewDate(addMonths(viewDate, offset));
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
  };

  const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 0 });
  const days: Date[] = [];

  let day = start;
  while (day <= endOfMonth(viewDate) || days.length % 7 !== 0) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          {format(viewDate, "MMMM yyyy")}
        </div>
        <div className="space-x-4">
          <button
            onClick={() => handleMonthNav(-1)}
            className="text-sm text-gray-500"
          >
            ‹
          </button>

          <button
            onClick={() => handleMonthNav(1)}
            className="text-sm text-gray-500"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
          <div key={index}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((day, idx) => (
          <button
            key={idx}
            className={clsx(
              "py-1 rounded-md",
              isSameDay(day, currentDate) && "bg-blue-600 text-white",
              isSameMonth(day, viewDate) ? "text-gray-900" : "text-gray-400",
              "hover:bg-blue-100"
            )}
            onClick={() => handleDateSelect(day)}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};
