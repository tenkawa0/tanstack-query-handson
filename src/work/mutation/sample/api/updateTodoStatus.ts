import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { RequestBody, Response } from "@/pages/api/todos/[id]/patchTodo";
import { Response as getTodosResponse } from "@/pages/api/todos/getTodos";

type Variables = {
  id: string;
  body: RequestBody;
};

async function updateTodoStatus({ id, body }: Variables): Promise<Response> {
  const { data } = await axios.patch(`/api/todos/${id}`, body);
  return data;
}

export function useUpdateTodoStatus(
  options?: UseMutationOptions<Response, AxiosError, Variables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (variables) => updateTodoStatus(variables),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      const todos = queryClient.getQueryData<getTodosResponse>(["todos"]);
      console.log(todos);
      if (!todos) return;

      queryClient.setQueryData(["todo"], {
        ...todos,
        items: todos.items.map((item) => (item.id === data.id ? data : item)),
      });
    },
  });
}
