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
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] lg:min-w-0">
          <div className="grid grid-cols-[80px_repeat(7,_minmax(90px,_1fr))] text-xs sm:text-sm h-[calc(100vh-80px)] overflow-auto border-t relative">
            <div className="bg-gray-100 border-r" />
            {days.map((date) => (
              <div
                key={date.toISOString()}
                className={clsx(
                  "border-b border-r py-3 px-2 text-center bg-gray-50 font-medium sticky top-0 z-10 min-w-[90px]",
                  isToday(date) && "bg-blue-50 text-blue-600"
                )}
              >
                <div className="text-sm sm:text-base font-semibold">
                  {format(date, "EEE")}
                </div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {format(date, "dd")}
                </div>
              </div>
            ))}

            {HOURS.map((hour) => (
              <React.Fragment key={hour}>
                <div className="border-r border-t px-2 py-3 text-right text-gray-500 bg-white sticky left-0 z-10 text-xs sm:text-sm">
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
                      className="border-r border-t h-20 sm:h-24 relative cursor-pointer hover:bg-blue-50 transition min-w-[90px]"
                      onClick={() => handleCellClick(date, hour)}
                    >
                      {slotEvents.map((event, index) => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                          className="absolute top-1 left-1 right-1 bg-blue-600 text-white text-xs sm:text-sm px-2 py-1 rounded z-10 min-h-[24px] flex items-center"
                          style={{ top: 4 + index * 28 }}
                        >
                          <span className="truncate">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
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
