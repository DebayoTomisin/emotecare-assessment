import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, EventFormData } from "@/schema";
import { format } from "date-fns";

type Props = {
  defaultValues?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
};

function formatDateTime(date?: Date | string) {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}

export default function EventForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      start: formatDateTime(defaultValues?.start) || formatDateTime(new Date()),
      end:
        formatDateTime(defaultValues?.end) ||
        formatDateTime(new Date(Date.now() + 60 * 60 * 1000)),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          {...register("title")}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm"
        />
        {errors.title && (
          <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Start</label>
        <input
          type="datetime-local"
          {...register("start")}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">End</label>
        <input
          type="datetime-local"
          {...register("end")}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm"
        />
        {errors.end && (
          <p className="text-xs text-red-600 mt-1">{errors.end.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
      >
        Save Event
      </button>
    </form>
  );
}
