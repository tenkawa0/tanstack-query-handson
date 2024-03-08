import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";

import { useTodos } from "../../api/getTodos";
import ErrorAlert from "@/components/ErrorAlert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import TodoListContainer from "./TodoListContainer";

export default function TodoList() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isFetching } = useTodos({
    query: { page },
    staleTime: 10 * 1000,
  });

  if (isError) {
    return <ErrorAlert />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Stack spacing={1}>
      <TodoListContainer todos={data.items} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            visibility: isFetching ? "visible" : "hidden",
          }}
        >
          データ更新中...
        </Typography>
        <Pagination
          hasPrev={data.hasPrev}
          hasNext={data.hasNext}
          handlePrev={() => setPage((prev) => prev - 1)}
          handleNext={() => setPage((prev) => prev + 1)}
        />
      </Stack>
    </Stack>
  );
}
