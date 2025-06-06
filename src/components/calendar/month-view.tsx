import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  format,
} from "date-fns";
import { useCalendarStore } from "@/store/useCalendarStore";
import clsx from "clsx";
import { useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import { EventFormData } from "@/schema";
import { EventModal } from "../events-modal";

export const MonthView = () => {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const { events, updateEvent, addEvent } = useEventStore();

  const [selectedEvent, setSelectedEvent] = useState<EventFormData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });

  const days: Date[] = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const toggleExpanded = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    setExpandedDate((prev) => (prev === key ? null : key));
  };

  const isExpanded = (date: Date) => {
    return expandedDate === format(date, "yyyy-MM-dd");
  };

  const openEditModal = (event: EventFormData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const openCreateModal = (date: Date) => {
    setSelectedEvent({
      title: "",
      start: date,
      end: addDays(date, 0),
      description: "",
    });
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
        <div className="min-w-[900px] md:min-w-0">
          <div className="grid grid-cols-7 border-t text-sm">
            {/* Day Labels */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
              <div
                key={label}
                className="px-2 py-2 bg-gray-50 font-medium text-center border-b min-w-[120px]"
              >
                {label}
              </div>
            ))}

            {days.map((date) => {
              const dayEvents = events.filter((event) => {
                const eventDate = new Date(event.start);
                return (
                  eventDate.getFullYear() === date.getFullYear() &&
                  eventDate.getMonth() === date.getMonth() &&
                  eventDate.getDate() === date.getDate()
                );
              });

              return (
                <div
                  key={date.toISOString()}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).dataset.eventId) return;
                    openCreateModal(date);
                  }}
                  className={clsx(
                    "h-24 sm:h-32 border p-1 sm:p-2 relative group transition cursor-pointer min-w-[120px]",
                    !isSameMonth(date, currentDate) &&
                      "bg-gray-50 text-gray-400",
                    isToday(date) && "border-blue-500"
                  )}
                >
                  <span className="absolute top-1 right-2 text-xs">
                    {format(date, "d")}
                  </span>

                  <div className="space-y-0.5 mt-5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <button
                        key={event.id}
                        data-event-id={event.id}
                        onClick={() => openEditModal(event)}
                        className="truncate rounded bg-blue-500 text-white text-xs px-1 py-0.5 text-left w-full"
                        title={event.title}
                      >
                        {event.title}
                      </button>
                    ))}

                    {dayEvents.length > 2 && (
                      <div className="relative">
                        <button
                          data-event-id="expand"
                          onClick={() => toggleExpanded(date)}
                          className="text-xs text-blue-600 mt-1"
                        >
                          +{dayEvents.length - 2} more
                        </button>

                        {isExpanded(date) && (
                          <div className="absolute z-10 top-full mt-1 bg-white shadow-md border rounded w-48 p-2 space-y-1 left-0">
                            {dayEvents.slice(2).map((event) => (
                              <button
                                key={event.id}
                                data-event-id={event.id}
                                onClick={() => openEditModal(event)}
                                className="block text-left text-sm w-full hover:bg-gray-100 rounded px-2 py-1"
                              >
                                {event.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
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

          closeModal();
        }}
      />
    </>
  );
};
