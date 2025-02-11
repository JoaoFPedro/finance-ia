"use client";

import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { TotalExpensePerCategory } from "../_actions/get-transaction-values/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { TRANSACTIONS_CATEGORY_LABELS } from "../_constants/transactions";

interface ExpensesByCategoryProps {
  expensesByCategory: TotalExpensePerCategory[];
}

const ExpensesByCategory = ({
  expensesByCategory,
}: ExpensesByCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 mt-6 rounded-xl border p-12 shadow-inner shadow-gray-900">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por categoria</CardTitle>
      </CardHeader>
      <CardContent>
        {expensesByCategory.map((category) => {
          return (
            <div key={category.category} className="space-y-4">
              <div className="mt-3 flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTIONS_CATEGORY_LABELS[category.category]}
                </p>
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
