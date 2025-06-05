import { CalendarPlus2 } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex gap-x-1 items-center">
      <CalendarPlus2 />
      <h1 className="text-xl font-bold hidden md:block">Calendars</h1>
    </div>
  );
};
