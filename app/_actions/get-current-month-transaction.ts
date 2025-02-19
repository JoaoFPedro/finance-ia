import { auth } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export const currentMonthTransaction = async (): Promise<
  number | undefined
> => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const currentMonthTransactions = await db.transactions.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });

  return currentMonthTransactions ? currentMonthTransactions : 0; // Retorna true se tiver 10 ou mais, false caso contrário
};
