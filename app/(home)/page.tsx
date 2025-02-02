import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCard from "./_components/summary-cards";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    console.log("userid", userId);
    redirect("/login");
  }
  return (
    <>
      <SummaryCard />
    </>
  );
};

export default Home;
