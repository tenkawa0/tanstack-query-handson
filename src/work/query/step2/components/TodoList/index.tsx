import axios from "axios";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Response } from "@/pages/api/todos/getTodos";
import _TodoList from "@/components/TodoList";
import Loading from "@/components/Loading";
import ErrorAlert from "@/components/ErrorAlert";

export default function TodoList() {
  /**
   * Note:
   * paginationを追加する
   */
  const { data, isPending, isError } = useQuery<Response>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios.get("/api/todos");
      return data;
    },
  });

  if (isError) {
    return <ErrorAlert />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Stack spacing={1}>
      <_TodoList
        todos={data.items}
        isLoading={false}
        handleChangeStatus={() => alert("未実装")}
        handleDelete={() => alert("未実装")}
      />
    </Stack>
  );
}
