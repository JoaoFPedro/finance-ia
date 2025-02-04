import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCard from "./_components/summary-cards";
import TimeSelect from "../_components/time-select";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    console.log("userid", userId);
    redirect("/login");
  }
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl">Dashboard</h1>
        <TimeSelect />
      </div>
      <SummaryCard />
    </div>
  );
};

export default Home;
