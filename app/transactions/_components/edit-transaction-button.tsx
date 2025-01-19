import { Button } from "@/app/_components/ui/button";
import UpsertTransaction from "@/app/_components/upsert-transaction-dialog";
import { Transactions } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EditTransactionButtonProps {
  transaction: Transactions;
}

const EditTransacionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setdialogIsOpen] = useState(false); // Estado para controlar o diálogo

  return (
    <div>
      <Button
        className="text-muted-foreground"
        variant="ghost"
        onClick={() => setdialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransaction
        isOpen={dialogIsOpen}
        setIsOpen={setdialogIsOpen}
        defaultValues={{ ...transaction, amount: Number(transaction.amount) }}
        transactionId={transaction.id}
      />
    </div>
  );
};

export default EditTransacionButton;
