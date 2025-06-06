import { CalendarHeader } from "@/components/calendar-header";
import { Calendar } from "@/components/calendar";
import { CalendarSideLayout } from "@/components/calendar-sidebar";
import { useEventStore } from "@/store/useEventStore";
import { useEventsQuery } from "@/hooks/useEventQuery";
import { useEffect } from "react";

const HomePage = () => {
  const { data, isLoading } = useEventsQuery();
  const setEvents = useEventStore((s) => s.setEvents);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  return (
    <main className="relative overflow-hidden">
      <CalendarHeader />
      <div className="flex">
        <div className="w-[15%]">
          <CalendarSideLayout />
        </div>
        <div className="w-full overflow-scroll">
          {isLoading ? (
            <h1 className="text-center ">Loading...</h1>
          ) : (
            <Calendar />
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
