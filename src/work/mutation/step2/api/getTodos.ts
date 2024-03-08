import axios from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Query, Response } from "@/pages/api/todos/getTodos";

type Options = Omit<UseQueryOptions<Response>, "queryKey" | "queryFn"> & {
  query?: Query;
};

async function getTodos({ page }: Query = {}): Promise<Response> {
  const { data } = await axios.get("/api/todos", { params: { page } });
  return data;
}

export function useTodos({ query, ...options }: Options) {
  return useQuery({
    ...options,
    queryKey: ["todos", query],
    queryFn: () => getTodos(query),
  });
}
