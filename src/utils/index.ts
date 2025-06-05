import { differenceInMinutes } from "date-fns";

export function getEventDurationInHours(start: Date, end: Date) {
  const mins = differenceInMinutes(end, start);
  return Math.max(mins / 60, 0.5); // min height: 30min
}
