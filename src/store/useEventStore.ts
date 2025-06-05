import { create } from "zustand";
import { CalendarEvent } from "@/hooks/useEventQuery";

type EventStore = {
  events: CalendarEvent[];
  setEvents: (data: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (data) => set({ events: data }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),
}));
