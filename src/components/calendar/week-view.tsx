import React, { useState } from "react";
import {
  startOfWeek,
  addDays,
  isToday,
  format,
  setHours,
  startOfDay,
} from "date-fns";
import clsx from "clsx";
import { useCalendarStore } from "@/store/useCalendarStore";
import { useEventStore } from "@/store/useEventStore";
import { EventModal } from "../events-modal";
import { EventFormData } from "@/schema";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function WeekView() {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const { events, updateEvent } = useEventStore();

  const [selectedEvent, setSelectedEvent] = useState<EventFormData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleEventClick = (event: EventFormData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCellClick = (day: Date, hour: number) => {
    const start = setHours(startOfDay(day), hour);
    const end = setHours(startOfDay(day), hour + 1);

    setSelectedEvent({ title: "", start, end, description: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="grid grid-cols-[60px_repeat(7,_1fr)] text-xs sm:text-sm h-[calc(100vh-80px)] overflow-auto border-t relative">
        <div className="bg-gray-100 border-r" />
        {days.map((date) => (
          <div
            key={date.toISOString()}
            className={clsx(
              "border-b border-r py-2 px-1 text-center bg-gray-50 font-medium sticky top-0 z-10",
              isToday(date) && "bg-blue-50 text-blue-600"
            )}
          >
            {format(date, "EEE dd")}
          </div>
        ))}

        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="border-r border-t px-1 py-2 text-right text-gray-500 bg-white sticky left-0 z-10">
              {format(setHours(startOfDay(new Date()), hour), "haaa")}
            </div>

            {days.map((date) => {
              const slotStart = setHours(startOfDay(date), hour);
              const slotEnd = setHours(startOfDay(date), hour + 1);

              const slotEvents = events.filter((event) => {
                const eventStart = new Date(event.start);
                return eventStart >= slotStart && eventStart < slotEnd;
              });

              return (
                <div
                  key={date.toISOString() + hour}
                  className="border-r border-t h-16 sm:h-20 relative cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => handleCellClick(date, hour)}
                >
                  {slotEvents.map((event, index) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                      className="absolute top-1 left-1 right-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded z-10"
                      style={{ top: index * 20 }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultValues={selectedEvent || undefined}
        onSubmit={(data) => {
          const payload = {
            id: selectedEvent?.id || crypto.randomUUID(),
            ...data,
          };
          updateEvent(payload);
          closeModal();
        }}
      />
    </>
  );
}
