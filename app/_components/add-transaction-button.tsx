import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";

const AddTransactionButton = () => {
  return (
    <Button className="rounded-full text-sm">
      Adicionar Transação
      <ArrowDownUpIcon />
    </Button>
  );
};

export default AddTransactionButton;
