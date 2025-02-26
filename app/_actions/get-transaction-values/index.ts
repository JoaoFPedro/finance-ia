"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionsType } from "@prisma/client";
import { TotalExpensePerCategory } from "./types";

export const getDashboard = async (month: string) => {
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

  const expensesTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "EXPENSE", userId: userId },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const depositTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "DEPOSIT", userId: userId },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investmentTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "INVESTMENT", userId: userId },
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
        userId: userId,
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
    where: {
      ...where,
      userId: userId,
    },
    orderBy: { date: "desc" },
    take: 7,
  });
  console.log("LASTRANSACTIONS***", totalExpensePerCategory);
  return {
    totalExpensePerCategory,
    expensesTotal,
    lastTransactions,
    depositTotal,
    investmentTotal,
  };
};
