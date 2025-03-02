import { auth, clerkClient } from "@clerk/nextjs/server";
import { currentMonthTransaction } from "./get-current-month-transaction";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const clerk = await clerkClient(); // Primeiro resolva clerkClient()
  const user = await clerk.users.getUser(userId); // Agora você pode acessar users
  const hasProPlan = user.publicMetadata?.subscriptionPlan === "pro";

  const currentMonthTransactions = await currentMonthTransaction();
  if (
    currentMonthTransactions &&
    currentMonthTransactions >= 10 &&
    !hasProPlan
  ) {
    return false;
  }
  return true;
};
