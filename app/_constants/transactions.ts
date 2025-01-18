import { TransactionsType } from "@prisma/client";

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionsType.DEPOSIT,
    label: "Ganho",
  },
  {
    value: TransactionsType.EXPENSE,
    label: "Gasto",
  },
  {
    value: TransactionsType.INVESTMENT,
    label: "Investimento",
  },
];
