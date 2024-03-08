import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { RequestBody, Response } from "@/pages/api/todos/postTodos";

type Variables = {
  body: RequestBody;
};

async function addTodo({ body }: Variables): Promise<Response> {
  const { data } = await axios.post("/api/todos", body);
  return data;
}

export function useAddTodo(
  options?: UseMutationOptions<Response, AxiosError, Variables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (variables) => addTodo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
