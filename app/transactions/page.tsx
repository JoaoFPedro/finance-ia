import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
// import { db } from "../_lib/prisma";

const TransactionsPage = async () => {
  //   const transactions = await db.transactions.findMany({});
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1>Transações</h1>
        <Button className="rounded-full text-sm">
          Adicionar Transação
          <ArrowDownUpIcon />
        </Button>
      </div>
    </div>
  );
};

export default TransactionsPage;
