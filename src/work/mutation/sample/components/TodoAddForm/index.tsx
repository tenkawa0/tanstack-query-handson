import { useSnackbar } from "notistack";

import _TodoAddForm from "@/components/TodoAddForm";
import { useAddTodo } from "@/work/mutation/sample/api/addTodo";

export default function TodoAddForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isPending } = useAddTodo();

  const handleSubmit = (title: string) => {
    mutate(
      { body: { title } },
      {
        onSuccess: () => {
          enqueueSnackbar("Todoを追加しました", { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar("エラーが発生しました", { variant: "error" });
        },
      }
    );
  };

  return <_TodoAddForm handleSubmit={handleSubmit} isLoading={isPending} />;
}
