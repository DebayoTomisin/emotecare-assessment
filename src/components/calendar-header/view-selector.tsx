import { useCalendarStore } from "@/store/useCalendarStore";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

const views = ["month", "week", "day"] as const;

export const ViewSelector = () => {
  const { view, setView } = useCalendarStore();

  return (
    <Listbox value={view} onChange={setView}>
      <div className="relative">
        <ListboxButton className="inline-flex items-center gap-x-3 px-5 py-2 border rounded-full h-[48px] text-sm">
          {view.charAt(0).toUpperCase() + view.slice(1)}
          <ChevronDown className="w-4 h-4" />
        </ListboxButton>
        <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
          {views.map((v) => (
            <ListboxOption
              key={v}
              value={v}
              className={({ active }) =>
                clsx("px-3 py-2 cursor-pointer text-sm", active && "bg-blue-50")
              }
            >
              {({ selected }) => (
                <div className="flex items-center justify-between">
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                  {selected && <Check className="w-4 h-4 text-blue-500" />}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
