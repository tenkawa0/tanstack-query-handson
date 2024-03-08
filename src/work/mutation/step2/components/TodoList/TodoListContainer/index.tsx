import _TodoList from "@/components/TodoList";
import { Todo } from "@/types";

type Props = {
  todos: Todo[];
};

export default function TodoListContainer({ todos }: Props) {
  return (
    <_TodoList
      todos={todos}
      isLoading={false}
      handleChangeStatus={() => alert("未実装")}
      handleDelete={() => alert("未実装")}
    />
  );
}
