import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

type Props = {
  hasPrev: boolean;
  hasNext: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function Pagination({ hasPrev, hasNext, handlePrev, handleNext }: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={handlePrev} disabled={!hasPrev} size="small">
        <NavigateBefore fontSize="inherit" />
      </IconButton>
      <IconButton onClick={handleNext} disabled={!hasNext} size="small">
        <NavigateNext fontSize="inherit" />
      </IconButton>
    </Stack>
  )
}