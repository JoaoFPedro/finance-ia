import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TimeSelect from "../_components/time-select";
import SummaryCards from "./_components/summary-cards";
import { isMatch } from "date-fns";
import PieChartBalance from "../_components/pie-chart";
import ExpensesByCategory from "../_components/expenses-by-category";

{
  /* 
  A informação de que o parâmetro vem da URL é definida pelo Next.js App Router, que passa os parâmetros de busca (searchParams) automaticamente para os Server Components que utilizam a convenção de nomeação [nome].tsx ou (grupo)/page.tsx.

Como o searchParams é obtido?
No Next.js, quando um usuário acessa uma página com uma query string (exemplo: ?month=02), esses valores são automaticamente incluídos em searchParams quando a página é renderizada. 
  */
}
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
  console.log("month***", month);
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect("?month=1");
  }
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl">Dashboard</h1>
        <TimeSelect />
      </div>

      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards month={month} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <PieChartBalance month={month} />
            <ExpensesByCategory month={month} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
