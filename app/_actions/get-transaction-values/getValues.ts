"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionsType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const getInvestmentTotal = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const transactions = await db.transactions.findMany({
      where: { type: TransactionsType.INVESTMENT, userId: userId },
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

export const getSpentTotal = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const transactions = await db.transactions.findMany({
      where: { type: TransactionsType.EXPENSE, userId: userId },
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
export const getBalanceTotal = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const transactions = await db.transactions.findMany({
      where: { type: TransactionsType.DEPOSIT, userId: userId },
      select: { amount: true },
    });
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum.plus(transaction.amount),
      new Decimal(0),
    );
    console.log("TOTALAMOUNT**", totalAmount);
    return totalAmount.toNumber();
  } catch (error) {
    console.log("Error:", error);
    return 0;
  }
};
