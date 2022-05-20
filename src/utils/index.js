import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export function PaginationRounded({ count, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant='outlined'
        shape='rounded'
        onChange={onChange}
      />
    </Stack>
  );
}
