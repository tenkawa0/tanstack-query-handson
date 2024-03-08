import _TodoAddForm from "@/components/TodoAddForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RequestBody } from "@/pages/api/todos/postTodos";

type Variables = {
  body: RequestBody;
};

export default function TodoAddForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ body }: Variables) => {
      const { data } = await axios.post("/api/todos", body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (title: string) => {
    mutate({ body: { title } });
  };

  return <_TodoAddForm handleSubmit={handleSubmit} isLoading={isPending} />;
}
