import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { EventFormData } from "@/schema";
import EventForm from "./event-form";

type Props = {
  isOpen: boolean;
  defaultValues?: Partial<EventFormData>;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
};

export const EventModal = ({
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
}: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg ">
              <DialogTitle className="text-lg font-semibold mb-4">
                Create Event
              </DialogTitle>

              <EventForm
                defaultValues={defaultValues}
                onSubmit={(data) => {
                  onSubmit(data);
                  onClose();
                }}
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
