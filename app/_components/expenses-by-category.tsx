"use client";

import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { TotalExpensePerCategory } from "../_actions/get-transaction-values/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

interface ExpensesByCategoryProps {
  expensesByCategory: TotalExpensePerCategory[];
}

const categoryMapping: Record<string, string> = {
  TRANSPORTATION: "Transporte",
  OTHER: "Outros",
  HOUSING: "Moradia",
  FOOD: "Alimentação",
  ENTERTAINMENT: "Entretenimento",
  HEALTH: "Saúde",
  UTILITY: "Utilidade",
  EDUCATION: "Educação",

  // TODO- fazer validação para nao pegar SALARY
};

const ExpensesByCategory = ({
  expensesByCategory,
}: ExpensesByCategoryProps) => {
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
  console.log("EXPENSES***", expensesByCategory);

  return (
    <ScrollArea className="col-span-2 mt-6 rounded-xl border p-12 shadow-inner shadow-gray-900">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por categoria</CardTitle>
      </CardHeader>
      <CardContent>
        {expensesByCategory.map((category) => {
          const categoryLabel =
            categoryMapping[category.category] || category.category;

          return (
            <div key={category.category} className="space-y-4">
              <div className="mt-3 flex w-full justify-between">
                <p className="text-sm font-bold">{categoryLabel}</p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
              <p className="text-sm text-muted-foreground">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(category.totalAmount)}
              </p>
            </div>
          );
        })}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesByCategory;
