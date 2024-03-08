import { Paper, Stack, Typography } from "@mui/material";
import TodoAddForm from "@/components/TodoAddForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <Stack alignItems="center" sx={{ p: 3 }} spacing={3}>
      <Stack alignItems="center">
        <Typography variant="h1">Todo List</Typography>
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          未完成
        </Typography>
      </Stack>
      <Stack sx={{ maxWidth: "sm", width: "100%" }} spacing={1}>
        <TodoAddForm handleSubmit={() => alert("未実装")} isLoading={false} />
        <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.100" }}>
          <TodoList
            todos={[]}
            isLoading={false}
            handleChangeStatus={() => alert("未実装")}
            handleDelete={() => alert("未実装")}
          />
        </Paper>
      </Stack>
      <Typography sx={{ color: "text.secondary" }}>
        TanStack
        Queryの使い方を理解し、Todoの取得・追加・更新・削除を実装しましょう！
      </Typography>
    </Stack>
  );
}
