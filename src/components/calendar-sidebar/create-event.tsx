import { useState } from "react";
import { Plus } from "lucide-react";
import { useCalendarStore } from "@/store/useCalendarStore";
import { useEventStore } from "@/store/useEventStore";
import { EventModal } from "../events-modal";
import { EventFormData } from "@/schema";

export const CreateEventButton = () => {
  const currentDate = useCalendarStore((s) => s.currentDate);
  const { updateEvent } = useEventStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const defaultEvent: Partial<EventFormData> = {
    title: "",
    description: "",
    start: currentDate,
    end: new Date(currentDate.getTime() + 60 * 60 * 1000), // 1 hour after
  };

  return (
    <>
      <button
        onClick={handleCreateClick}
        className="border border-gray-200 w-3/4 text-black text-sm font-medium py-2 px-4 rounded-md shadow-sm flex gap-x-4 items-center justify-center"
      >
        <Plus />
        <span>Create</span>
      </button>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultValues={defaultEvent}
        onSubmit={(data: any) => {
          const payload = {
            id: crypto.randomUUID(),
            ...data,
            start: new Date(data.start),
            end: new Date(data.end),
          };
          updateEvent(payload);
          closeModal();
        }}
      />
    </>
  );
};
