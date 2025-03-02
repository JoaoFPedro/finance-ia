"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import UpsertTransaction from "./upsert-transaction-dialog";

interface CurrentMonthTransactionsProps {
  totalMonthTransactions?: boolean;
}

const AddTransactionButton = (
  totalMonthTransactions: CurrentMonthTransactionsProps,
) => {
  const userCanCreateTransaction =
    totalMonthTransactions.totalMonthTransactions;

  const [dialogIsOpen, setdialogIsOpen] = useState(false);
  return (
    <div>
      <Button
        className="rounded-full text-sm"
        onClick={() => setdialogIsOpen(true)}
        disabled={!userCanCreateTransaction}
      >
        Adicionar Transação
        <ArrowDownUpIcon />
      </Button>

      <UpsertTransaction isOpen={dialogIsOpen} setIsOpen={setdialogIsOpen} />
    </div>
  );
};

export default AddTransactionButton;
