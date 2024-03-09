import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import aspida from "@aspida/axios";

import ErrorAlert from "@/components/ErrorAlert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import TodoListContainer from "./TodoListContainer";
import { useQuery } from "@tanstack/react-query";
import api from "@/extra/api/$api";

export default function TodoList() {
  const [page, setPage] = useState(1);

  const client = api(aspida());
  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["todos", { page }],
    queryFn: () => client.todos.$get({ query: { page } }),
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
