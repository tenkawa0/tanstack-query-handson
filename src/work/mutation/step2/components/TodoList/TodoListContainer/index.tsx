import { useSnackbar } from "notistack";

import _TodoList from "@/components/TodoList";
import { Todo } from "@/types";
import { useUpdateTodoStatus } from "../../../api/updateTodoStatus";
import { useDeleteTodo } from "../../../api/deleteTodo";

type Props = {
  todos: Todo[];
};

export default function TodoListContainer({ todos }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const updateTodoStatus = useUpdateTodoStatus();
  const deleteTodo = useDeleteTodo();

  const handleChangeStatus = (item: Todo) => {
    const { id, status } = item;
    updateTodoStatus.mutate(
      {
        id,
        body: { status: status === "done" ? "todo" : "done" },
      },
      {
        onSuccess: (data) => {
          enqueueSnackbar(
            data.status === "done"
              ? "Todoを完了しました"
              : "Todoを未完了に戻しました ",
            { variant: "success" }
          );
        },
        onError: () => {
          enqueueSnackbar("エラーが発生しました", { variant: "error" });
        },
      }
    );
  };

  const handleDelete = (item: Todo) => {
    const { id } = item;
    deleteTodo.mutate(
      { id },
      {
        onSuccess: () => {
          enqueueSnackbar("Todoを削除しました", { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar("エラーが発生しました", { variant: "error" });
        },
      }
    );
  };

  const isLoading = updateTodoStatus.isPending || deleteTodo.isPending;

  return (
    <_TodoList
      todos={todos}
      isLoading={isLoading}
      handleChangeStatus={handleChangeStatus}
      handleDelete={handleDelete}
    />
  );
}
