import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

type Props = {
  handleSubmit: (input: string) => void
}

export default function TodoAddForm({ handleSubmit }: Props) {
  const [value, setValue] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(value);
    }}>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Todo..."
          autoComplete="off"
        />
        <Button type="submit" variant="contained" disabled={!value}>
          追加
        </Button>
      </Stack>
    </form>
  );
}