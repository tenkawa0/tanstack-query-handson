import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { Response } from "@/pages/api/todos/[id]/deleteTodo";

type Variables = {
  id: string;
};

async function deleteTodo({ id }: Variables): Promise<Response> {
  const { data } = await axios.delete(`/api/todos/${id}`);
  return data;
}

export function useDeleteTodo(
  options?: UseMutationOptions<Response, AxiosError, Variables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (variables) => deleteTodo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
