import { useState } from "react";
import _TodoList from "@/components/TodoList";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Response } from "@/pages/api/todos/getTodos";
import Loading from "@/components/Loading";
import ErrorAlert from "@/components/ErrorAlert";
import Pagination from "@/components/Pagination";

export default function TodoList() {
  const [page, setPage] = useState(1);

  const { data, isFetching, isError } = useQuery<Response>({
    queryKey: ["todos", { page }],
    queryFn: async () => {
      const { data } = await axios.get("/api/todos", { params: { page } });
      return data;
    },
    staleTime: 10 * 1000,
  });

  if (isError) {
    return <ErrorAlert />;
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Stack spacing={1}>
      <_TodoList
        todos={data?.items ?? []}
        handleChangeStatus={() => alert("未実装")}
        handleDelete={() => alert("未実装")}
      />
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
