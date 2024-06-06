import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import toast from "react-hot-toast";

type ResponseType = InferResponseType<
  (typeof client.api.schedule)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.schedule)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteSchedules = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.schedule["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Schedules deleted");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to delete schedules");
    },
  });

  return mutation;
};
