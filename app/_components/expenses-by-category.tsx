"use client";

import { Progress } from "./ui/progress";

import { ScrollArea } from "./ui/scroll-area";
import { TotalExpensePerCategory } from "../_actions/get-transaction-values/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

interface ExpensesByCategoryProps {
  expensesByCategory: TotalExpensePerCategory[];
}

const ExpensesByCategory = ({
  expensesByCategory,
}: ExpensesByCategoryProps) => {
  console.log("EXPENSES***", expensesByCategory);
  //   const [investmentTotal, setInvestmentTotal] = useState<number | null>(null);
  //   const [spentTotal, setSpentTotal] = useState<number | null>(null);
  //   const [balanceTotal, setBalanceTotal] = useState<number | null>(null);
  // const [totalBalance, setTotalBalance] = useState<number | null>(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchTotal = async () => {
  //     setLoading(true);

  //     try {
  //       // const totalInvestment = await getInvestmentTotal(month);
  //       // const totalSpent = await getSpentTotal(month);
  //       // const balance = await getDepositTotal(month);
  //       const totalBalanceSum = await getTotalBalance(month);
  //       console.log("GET_TOTAL_BALANCE***", totalBalanceSum);

  //       // setInvestmentTotal(totalInvestment);
  //       // setSpentTotal(totalSpent);
  //       // setBalanceTotal(balance);
  //       setTotalBalance(totalBalance);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTotal();
  // }, [month, totalBalance]);

  // if (loading) {
  //   return <div className="text-center">Carregando...</div>;
  // }

  return (
    <ScrollArea className="broder col-span-2 h-full rounded-md p-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por categoria</CardTitle>
      </CardHeader>
      <CardContent>
        {expensesByCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">{category.category}</p>
              <p className="text-sm font-bold">{category.percentageOfTotal}</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesByCategory;
