import { auth } from "@clerk/nextjs/server";
import { currentMonthTransaction } from "./get-current-month-transaction";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentMonthTransactions = await currentMonthTransaction();
  if (currentMonthTransactions && currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
