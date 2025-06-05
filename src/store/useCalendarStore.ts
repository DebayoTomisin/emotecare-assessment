import { create } from "zustand";
import { CalendarEvent, CalendarView } from "@/types";

interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  events: CalendarEvent[];
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  addEvent: (event: CalendarEvent) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  view: "month",
  events: [],
  setCurrentDate: (date) => set({ currentDate: date }),
  setView: (view) => set({ view }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
}));
