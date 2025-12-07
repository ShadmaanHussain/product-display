import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";

type ConfirmDeleteDialogProps = {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void> | void; // action caller
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ConfirmDeleteDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the record.",
  onConfirm,
  open,
  setOpen,
}: ConfirmDeleteDialogProps) {

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
