import { MiniCalendar } from "./mini-calendar";
import { CreateEventButton } from "./create-event";

export const CalendarSideLayout = () => {
  return (
    <aside className="hidden md:flex flex-col gap-4 w-64 p-4 border-r border-gray-200 bg-white">
      <CreateEventButton />
      <MiniCalendar />
    </aside>
  );
};
