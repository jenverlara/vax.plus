"use client";

import { useBulkDeleteSchedules } from "@/hooks/schedules/api/use-Bulk-Delete-Schedules";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetSchedules } from "@/hooks/schedules/api/use-Get-Schedules";
import { useNewSchedule } from "@/hooks/schedules/misc/use-New-Schedule";
import { DataTable } from "@/components/tables/data-Table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { columns } from "./columns";

export default function SchedulePage() {
  // add new accounts custom hook
  const newSchedule = useNewSchedule();
  // get accounts custom hook
  const schedulesQuery = useGetSchedules();
  // delete accounts custom hook
  const deleteSchedules = useBulkDeleteSchedules();
  // init delete state
  const isDisabled = schedulesQuery.isLoading || deleteSchedules.isPending;

  const schedules = schedulesQuery.data || [];

  if (schedulesQuery.isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>

          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Appointment Schedules
          </CardTitle>
          <Button size="sm" onClick={newSchedule.onOpen}>
            <Plus className="mr-2 size-4" />
            Add new
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={schedules}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteSchedules.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
