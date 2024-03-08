import React from "react";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Todo } from "@/types";

type Props = {
  todo: Todo;
  isLoading: boolean;
  handleChangeStatus: (item: Todo) => void;
  handleDelete: (item: Todo) => void;
};

export default function TodoListItem({
  todo,
  isLoading,
  handleChangeStatus,
  handleDelete,
}: Props) {
  const labelId = `checkbox-label-${todo.id}`;
  const isDone = todo.status === "done";

  return (
    <ListItem
      key={todo.id}
      disablePadding
      secondaryAction={
        <IconButton
          size="small"
          edge="end"
          onClick={() => handleDelete(todo)}
          aria-label="削除"
          disabled={isLoading}
        >
          <Delete fontSize="small" />
        </IconButton>
      }
    >
      <Checkbox
        size="small"
        edge="start"
        checked={isDone}
        inputProps={{ "aria-labelledby": labelId }}
        onChange={() => handleChangeStatus(todo)}
        disabled={isLoading}
      />
      <ListItemText
        id={labelId}
        primary={!isDone ? todo.title : <del>{todo.title}</del>}
        {...((isDone || isLoading) && {
          sx: { color: "action.disabled" },
        })}
      />
    </ListItem>
  );
}
