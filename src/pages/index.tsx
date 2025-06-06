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
      <div className="flex gap-4">
        <div className="w-1/6">
          <CalendarSideLayout />
        </div>
        <div className="w-full md:w-5/6 overflow-scroll">
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
