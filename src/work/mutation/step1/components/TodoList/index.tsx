import React, { useState } from "react";
import { Box, Stack } from "@mui/material";

import { useTodos } from "../../api/getTodos";
import ErrorAlert from "@/components/ErrorAlert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import TodoListContainer from "./TodoListContainer";

export default function TodoList() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useTodos({
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
      <Box sx={{ alignSelf: "flex-end" }}>
        <Pagination
          hasPrev={!!data?.hasPrev}
          hasNext={!!data?.hasNext}
          handlePrev={() => setPage((prev) => prev - 1)}
          handleNext={() => setPage((prev) => prev + 1)}
        />
      </Box>
    </Stack>
  );
}
