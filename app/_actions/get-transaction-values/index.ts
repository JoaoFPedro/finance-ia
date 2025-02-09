"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionsType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { TotalExpensePerCategory } from "./types";

interface GetValueProps {
  month: string;
}
export const getInvestmentTotal = async ({ month }: GetValueProps) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const where = {
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    };
    const transactions = await db.transactions.findMany({
      where: { ...where, type: TransactionsType.INVESTMENT, userId: userId },
      select: { amount: true },
    });

    const totalAmount = transactions.reduce(
      (sum, transaction) => sum.plus(transaction.amount),
      new Decimal(0),
    );

    return totalAmount.toNumber();
  } catch (error) {
    console.error("Error fetching investment transactions:", error);
    return 0;
  }
};

export const getSpentTotal = async ({ month }: GetValueProps) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const where = {
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    };
    const transactions = await db.transactions.findMany({
      where: { ...where, type: TransactionsType.EXPENSE, userId: userId },
      select: { amount: true },
    });
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum.plus(transaction.amount),
      new Decimal(0),
    );

    return totalAmount.toNumber();
  } catch (error) {
    console.log("Error:", error);
    return 0;
  }
};
export const getDepositTotal = async ({ month }: GetValueProps) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const where = {
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    };
    const transactions = await db.transactions.findMany({
      where: { ...where, type: TransactionsType.DEPOSIT, userId: userId },
      select: { amount: true, type: true },
    });
    console.log("SPENT****", transactions);
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum.plus(transaction.amount),
      new Decimal(0),
    );
    return totalAmount.toNumber();
  } catch (error) {
    console.log("Error:", error);
    return 0;
  }
};
export const getTotalBalance = async ({ month }: GetValueProps) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const where = {
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    };
    const transactions = await db.transactions.findMany({
      where: { ...where, userId: userId },
      select: { amount: true },
    });
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum.plus(transaction.amount),
      new Decimal(0),
    );
    console.log("total****", totalAmount);
    return totalAmount.toNumber();
  } catch (error) {
    console.log("Error:", error);
    return 0;
  }
};

// REFACTORING

export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const expensesTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transactions.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionsType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  const lastTransactions = await db.transactions.findMany({
    where,
    orderBy: { date: "desc" },
    take: 7,
  });
  return {
    totalExpensePerCategory,
    expensesTotal,
    lastTransactions,
  };
};
