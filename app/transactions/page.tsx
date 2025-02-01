import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const transactions = await db.transactions.findMany({
    where: {
      id: userId,
    },
  });
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between">
        <h1>Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
