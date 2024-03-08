import { useEffect, useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";

type Props = {
  handleSubmit: (input: string) => void;
  isLoading: boolean;
};

export default function TodoAddForm({ handleSubmit, isLoading }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setValue("");
    }
  }, [isLoading]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        handleSubmit(value);
      }}
    >
      <Stack direction="row" spacing={1}>
        <TextField
          disabled={isLoading}
          fullWidth
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Todo..."
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!value || isLoading}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "追加"}
        </Button>
      </Stack>
    </form>
  );
}
