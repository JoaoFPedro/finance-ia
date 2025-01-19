"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  Prisma /*TransactionsCategory, TransactionsPaymentMethod, TransactionsType */,
} from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";
import { AddTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

/* 
#It is also possible to create own interface

interface AddTransactionsParams {
    name: string;
    amount: number;
    type: TransactionsType;
    category: TransactionsCategory;
    paymentMethod: TransactionsPaymentMethod
    date: Date;

}

*/

export const addTransaction = async (
  params: Omit<Prisma.TransactionsCreateInput, "userId">,
) => {
  AddTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Sem permissão");
  }
  await db.transactions.create({
    data: { ...params, userId },
  });
  revalidatePath("/transactions");
};
