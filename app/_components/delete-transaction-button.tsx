import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Transactions } from "@prisma/client";
import { deleteTransaction } from "../_actions/delete-transaction";
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
      <Button
        className="text-muted-foreground"
        variant="ghost"
        onClick={handleDeleteTransction}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default DeleteTransactionButton;
