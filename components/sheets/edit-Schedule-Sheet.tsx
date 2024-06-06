"use client";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { useDeleteAccount } from "@/hooks/accounts/api/use-Delete-Account";
import { useOpenSchedule } from "@/hooks/schedules/misc/use-Open-Schedule";
import { useEditSchedule } from "@/hooks/schedules/api/use-Edit-Schedule";
import { useGetSchedule } from "@/hooks/schedules/api/use-Get-Schedule";
import { ScheduleForm } from "@/components/forms/schedule-form";
import { useConfirm } from "@/hooks/accounts/misc/use-Confirm";
import { insertVaccinationSchedule } from "@/db/schema";
import { useMountedState } from "react-use";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const formSchema = insertVaccinationSchedule.pick({
  name: true,
  date: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditScheduleSheet = () => {
  const isMounted = useMountedState();

  // import custom hook
  const { isOpen, onClose, id } = useOpenSchedule();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this schedule",
  );

  const scheduleQuery = useGetSchedule(id);
  const editMutation = useEditSchedule(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = scheduleQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = scheduleQuery.data
    ? {
        name: scheduleQuery.data.name,
        date: scheduleQuery.data.date
          ? new Date(scheduleQuery.data.date)
          : new Date(),
      }
    : {
        name: "",
        date: new Date(),
      };

  if (!isMounted) return null;

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Schedule</SheetTitle>
            <SheetDescription>
              Edit an existing appointment schedule
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ScheduleForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
