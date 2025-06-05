import {
  startOfDay,
  setHours,
  addMinutes,
  isSameDay,
  format,
  differenceInMinutes,
  parseISO,
} from "date-fns";
import { useCalendarStore } from "@/store/useCalendarStore";
import { useEventStore } from "@/store/useEventStore";
import { EventModal } from "../events-modal";
import { useState } from "react";
import { EventFormData } from "@/schema";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function DayView() {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const { events, updateEvent, addEvent } = useEventStore();

  const [selectedEvent, setSelectedEvent] = useState<EventFormData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getDate() === currentDate.getDate()
    );
  });

  const handleEventClick = (event: EventFormData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCellClick = (hour: number) => {
    const start = setHours(startOfDay(currentDate), hour);
    const end = addMinutes(start, 30);

    setSelectedEvent({
      title: "",
      start,
      end,
      description: "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-[60px_1fr] text-xs sm:text-sm h-[calc(100vh-80px)] overflow-auto border-t relative">
      <div className="flex flex-col">
        {HOURS.map((hour, index) => (
          <div
            key={index}
            className="border-b h-16 sm:h-20 px-1 py-2 text-right text-gray-500"
          >
            {format(setHours(startOfDay(new Date()), hour), "haaa")}
          </div>
        ))}
      </div>

      <div className="relative border-l">
        {HOURS.map((hour, index) => (
          <div
            key={index}
            className="border-b h-16 sm:h-20 hover:bg-blue-50 cursor-pointer"
            onClick={() => handleCellClick(hour)}
          />
        ))}

        {dayEvents.map((event, index) => {
          const start = parseISO(event.start.toString());
          const end = parseISO(event.end.toString());

          const top = (start.getHours() + start.getMinutes() / 60) * 80;
          const height = Math.max(
            (differenceInMinutes(end, start) / 60) * 80,
            30
          );

          return (
            <button
              key={index}
              onClick={() => handleEventClick(event)}
              className="absolute left-2 right-2 bg-blue-500 text-white text-xs p-1 rounded shadow-md"
              style={{ top, height }}
            >
              {event.title}
            </button>
          );
        })}
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        defaultValues={selectedEvent || undefined}
        onSubmit={(data) => {
          const isEdit = !!selectedEvent?.id;
          const payload = {
            id: selectedEvent?.id || crypto.randomUUID(),
            ...data,
          };
          if (isEdit) {
            updateEvent(payload);
          } else {
            addEvent(payload);
          }
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
}
