import { Button } from "./ui/button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>

      <div className="flex gap-2">
        <Button size="sm" disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</Button>
        <Button size="sm" disabled={page === totalPages} onClick={() => onChange(page + 1)}>Next</Button>
      </div>
    </div>
  );
}