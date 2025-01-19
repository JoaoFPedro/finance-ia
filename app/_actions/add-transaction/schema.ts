import {
  TransactionsType,
  TransactionsCategory,
  TransactionsPaymentMethod,
} from "@prisma/client";
import { z } from "zod";

export const AddTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionsType),
  category: z.nativeEnum(TransactionsCategory),
  paymentMethod: z.nativeEnum(TransactionsPaymentMethod),
  date: z.date(),
});
