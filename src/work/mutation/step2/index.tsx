import { Paper, Stack, Typography } from "@mui/material";

import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";

export default function MutationStep2() {
  return (
    <Stack alignItems="center" sx={{ p: 3 }} spacing={3}>
      <Stack alignItems="center">
        <Typography variant="h1">Todo List</Typography>
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          データ更新step2.
        </Typography>
      </Stack>
      <Stack sx={{ maxWidth: "sm", width: "100%" }} spacing={1}>
        <TodoAddForm />
        <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.100" }}>
          <TodoList />
        </Paper>
      </Stack>
    </Stack>
  );
}
