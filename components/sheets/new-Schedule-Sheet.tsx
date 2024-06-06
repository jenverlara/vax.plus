"use client";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

import { useCreateSchedule } from "@/hooks/schedules/api/use-Create-Schedule";
import { useNewSchedule } from "@/hooks/schedules/misc/use-New-Schedule";
import { ScheduleForm } from "@/components/forms/schedule-form";
import { insertVaccinationSchedule } from "@/db/schema";
import { useMountedState } from "react-use";
import { z } from "zod";

const formSchema = insertVaccinationSchedule.pick({
  name: true,
  date: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewScheduleSheet = () => {
  const isMounted = useMountedState();

  // import custom hook
  const { isOpen, onClose } = useNewSchedule();

  const mutation = useCreateSchedule();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!isMounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Schedule</SheetTitle>
          <SheetDescription>
            Create a new schedule for the appointments
          </SheetDescription>
        </SheetHeader>

        <ScheduleForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
