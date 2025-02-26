import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TimeSelect from "../_components/time-select";
import SummaryCards from "./_components/summary-cards";
import { isMatch } from "date-fns";
import PieChartBalance from "../_components/pie-chart";
import ExpensesByCategory from "../_components/expenses-by-category";
import { getDashboard } from "../_actions/get-transaction-values";
import LastTransactions from "../_components/last-transactions";
import { canUserAddTransaction } from "../_actions/can-user-add-transaction";
import AiReportButton from "../_components/ai-report-button";
import { userHasProPlan } from "../_actions/userHasProPlan";

interface HomeProps {
  searchParams: {
    month: string;
  };
}
const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    console.log("userid", userId);
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect("?month=1");
  }
  const dashboard = await getDashboard(month);
  const canUserCreateTransanction = await canUserAddTransaction();
  const userHasPlan = await userHasProPlan();
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl">Dashboard</h1>
        <div className="flex gap-4">
          <AiReportButton month={month} hasProPlan={userHasPlan} />
          <TimeSelect />
        </div>
      </div>

      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards
            {...dashboard}
            canUserAddTransaction={canUserCreateTransanction}
          />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <PieChartBalance {...dashboard} />
            <ExpensesByCategory
              expensesByCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
        <LastTransactions lastTransactions={dashboard.lastTransactions} />
      </div>
    </div>
  );
};

export default Home;
