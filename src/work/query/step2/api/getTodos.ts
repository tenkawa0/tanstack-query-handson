import axios from "axios";
import { useQuery, QueryOptions } from "@tanstack/react-query";

import { Query, Response } from "@/pages/api/todos/getTodos";

type Options = QueryOptions<Response> & { query?: Query };

async function getTodos({ page }: Query = {}): Promise<Response> {
  const { data } = await axios.get("/api/todos", { params: { page } });
  return data;
}

export function useTodos({ query, ...options }: Options = {}) {
  return useQuery({
    ...options,
    queryKey: ["todos", query],
    queryFn: () => getTodos(query),
  });
}
