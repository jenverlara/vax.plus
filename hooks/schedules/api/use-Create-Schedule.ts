import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import toast from "react-hot-toast";

type ResponseType = InferResponseType<typeof client.api.schedule.$post>;
type RequestType = InferRequestType<typeof client.api.schedule.$post>["json"];

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.schedule.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Schedule created");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => {
      toast.error("Failed to create schedule");
    },
  });

  return mutation;
};
