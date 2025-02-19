import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_actions/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const transactions = await db.transactions.findMany({
    where: {
      userId: userId,
    },
  });

  // const currentMonthTransactions = await db.transactions.findMany({
  //   where: {
  //     userId,
  //     createdAt: {
  //       gte: startOfMonth(new Date()),
  //       lt: endOfMonth(new Date()),
  //     },
  //   },
  //   take: 10,
  // });
  const totalMonthTransactions = await canUserAddTransaction();
  console.log("LASTRANSACTIONS***", totalMonthTransactions);
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between">
        <h1>Transações</h1>
        <AddTransactionButton totalMonthTransactions={totalMonthTransactions} />
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
