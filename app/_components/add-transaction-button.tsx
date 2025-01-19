"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import UpsertTransaction from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [dialogIsOpen, setdialogIsOpen] = useState(false); // Estado para controlar o diálogo

  return (
    <div>
      <Button
        className="rounded-full text-sm"
        onClick={() => setdialogIsOpen(true)}
      >
        Adicionar Transação
        <ArrowDownUpIcon />
      </Button>

      <UpsertTransaction isOpen={dialogIsOpen} setIsOpen={setdialogIsOpen} />
    </div>
  );
};

export default AddTransactionButton;
