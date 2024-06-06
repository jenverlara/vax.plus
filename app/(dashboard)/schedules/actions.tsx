"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteSchedule } from "@/hooks/schedules/api/use-Delete-Schedule";
import { useOpenSchedule } from "@/hooks/schedules/misc/use-Open-Schedule";
import { useConfirm } from "@/hooks/accounts/misc/use-Confirm";
import { Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GiTrashCan } from "react-icons/gi";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenSchedule();

  const deleteMutation = useDeleteSchedule(id);

  const isPending = deleteMutation.isPending;

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this appointment schedule",
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onOpen(id)} disabled={isPending}>
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
            <GiTrashCan className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
