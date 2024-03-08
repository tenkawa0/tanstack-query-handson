import { Fade, List, Typography } from "@mui/material";
import { SwitchTransition } from "react-transition-group";

import { Todo } from "@/types";
import TodoListItem from "./TodoListItem";

type Props = {
  todos: Todo[];
  isLoading: boolean;
  handleChangeStatus: (item: Todo) => void;
  handleDelete: (item: Todo) => void;
};

export default function TodoList({
  todos,
  isLoading,
  handleChangeStatus,
  handleDelete,
}: Props) {
  return (
    <SwitchTransition>
      <Fade key={todos.length > 0 ? "list" : "empty"}>
        {todos.length > 0 ? (
          <List dense disablePadding>
            {todos.map((item) => (
              <TodoListItem
                key={item.id}
                todo={item}
                isLoading={isLoading}
                handleChangeStatus={handleChangeStatus}
                handleDelete={handleDelete}
              />
            ))}
          </List>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "text.disabled", lineHeight: "38px" }}
          >
            Todoが登録されていません
          </Typography>
        )}
      </Fade>
    </SwitchTransition>
  );
}
