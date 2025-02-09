import { TotalExpensePerCategory } from "@/app/_actions/get-transaction-values/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { PiggyBankIcon } from "lucide-react";
import { TRANSACTIONS_CATEGORY_LABELS } from "@/app/_constants/transactions";

interface LastTransactionsCategoryProps {
  expensesByCategory: TotalExpensePerCategory[];
}

const LastTransactions = ({
  expensesByCategory,
}: LastTransactionsCategoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações</CardTitle>
      </CardHeader>
      <CardContent>
        {expensesByCategory.map((category) => {
          return (
            <div key={category.category} className="space-y-4">
              <div className="mt-3 flex w-full justify-between">
                <div className="">
                  <div className="flex space-x-3">
                    <PiggyBankIcon />
                    <p className="text-sm font-bold">
                      {TRANSACTIONS_CATEGORY_LABELS[category.category]}
                    </p>
                  </div>
                  <div>
                    <p className="ml-10 text-xs text-muted-foreground">
                      {category.date}
                    </p>
                  </div>
                </div>

                <p className="">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(category.totalAmount)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LastTransactions;
