import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

// get accounts query custom hook
export const useGetSchedule = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["schedule", { id }],
    queryFn: async () => {
      const response = await client.api.schedule[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch schedule");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
