import { CalendarEvent } from "@/types";
import { useState } from "react";

export const useEventModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Partial<CalendarEvent>>(
    {}
  );

  const open = (defaults: Partial<CalendarEvent> = {}) => {
    setDefaultValues(defaults);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, defaultValues, open, close };
};
