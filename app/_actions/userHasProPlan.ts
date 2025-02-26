import { auth, clerkClient } from "@clerk/nextjs/server";

export const userHasProPlan = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await (await clerkClient()).users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "pro") {
    return true;
  }
  return false;
};
