import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriberPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
};

export default SubscriberPage;
