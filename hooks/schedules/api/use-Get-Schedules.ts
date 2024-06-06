import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

// get schedules query custom hook
export const useGetSchedules = () => {
  const query = useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      const response = await client.api.schedule.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
