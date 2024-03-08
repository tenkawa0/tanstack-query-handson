import React, { useState } from "react";

import { useTodos } from "../../api/getTodos";
import _TodoList from "@/components/TodoList";
import ErrorAlert from "@/components/ErrorAlert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { Box, Stack } from "@mui/material";

export default function TodoList() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useTodos({ query: { page, size: 5 } });

  if (isError) {
    return (<ErrorAlert />);
  }

  if (isPending) {
    return (<Loading />);
  }

  return (
    <Stack spacing={1}>
      <_TodoList
        todos={data.items}
        handleChangeStatus={() => alert("未実装")}
        handleDelete={() => alert("未実装")}
      />
      <Box sx={{ alignSelf: "flex-end" }}>
        <Pagination
          hasPrev={data.hasPrev}
          hasNext={data.hasNext}
          handlePrev={() => setPage(prev => prev - 1)}
          handleNext={() => setPage(prev => prev + 1)}
        />
      </Box>
    </Stack>
  );
};
