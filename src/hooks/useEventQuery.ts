import { useQuery } from "@tanstack/react-query";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
};

export const useEventsQuery = () => {
  return useQuery<CalendarEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/src/data/mock-events.json");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });
};
