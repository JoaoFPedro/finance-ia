import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Transactions } from "@prisma/client";
import { deleteTransaction } from "../_actions/delete-transaction";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DeleteTransactionButtonProps {
  transaction: Transactions;
}
const DeleteTransactionButton = ({
  transaction,
}: DeleteTransactionButtonProps) => {
  const handleDeleteTransction = async () => {
    try {
      await deleteTransaction(transaction.id);
    } catch (error) {
      console.log("Post Error:", error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-muted-foreground" variant="ghost">
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deseja mesmo excluir essa transação?</DialogTitle>
          </DialogHeader>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose>
              <Button
                type="submit"
                onClick={handleDeleteTransction}
                className="bg-red-600"
              >
                Excluir
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteTransactionButton;
