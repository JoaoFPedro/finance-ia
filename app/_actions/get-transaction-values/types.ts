import { TransactionsCategory } from "@prisma/client";

export interface TotalExpensePerCategory {
  category: TransactionsCategory;
  totalAmount: number;
  percentageOfTotal: number;
  date: string;
}
