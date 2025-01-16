"use client";

import { Badge } from "@/app/_components/ui/badge";
import {
  Transactions,
  TransactionsCategory,
  TransactionsPaymentMethod,
  TransactionsType,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

export const transactionsColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return transaction.type === TransactionsType.DEPOSIT ? (
        <Badge className="bg-muted font-bold text-primary hover:bg-muted">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          Depósito
        </Badge>
      ) : transaction.type === TransactionsType.EXPENSE ? (
        "Despesa"
      ) : transaction.type === TransactionsType.INVESTMENT ? (
        "Investimento"
      ) : (
        "Tipo desconhecido"
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => {
      return transaction.category === TransactionsCategory.HOUSING
        ? "Casa"
        : transaction.category === TransactionsCategory.TRANSPORTATION
          ? "Transporte"
          : transaction.category === TransactionsCategory.FOOD
            ? "Alimentação"
            : transaction.category === TransactionsCategory.ENTERTAINMENT
              ? "Entretenimento"
              : transaction.category === TransactionsCategory.HEALTH
                ? "Saúde"
                : transaction.category === TransactionsCategory.UTILITY
                  ? "Utilidade"
                  : transaction.category === TransactionsCategory.SALARY
                    ? "Salário"
                    : transaction.category === TransactionsCategory.EDUCATION
                      ? "Educação"
                      : "Outros";
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Metodo",
    cell: ({ row: { original: transaction } }) => {
      return transaction.paymentMethod === TransactionsPaymentMethod.CREDIT_CARD
        ? "Cartão de crédito"
        : transaction.paymentMethod === TransactionsPaymentMethod.DEBIT_CARD
          ? "Cartão de débito"
          : transaction.paymentMethod ===
              TransactionsPaymentMethod.BANK_TRANSFER
            ? "Transferência Bancaria"
            : transaction.paymentMethod === TransactionsPaymentMethod.BANK_SLIP
              ? "Boleto"
              : transaction.paymentMethod === TransactionsPaymentMethod.CASH
                ? "Dinheiro"
                : transaction.paymentMethod === TransactionsPaymentMethod.PIX
                  ? "Pix"
                  : "Outros";
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      const formattedDate = new Date(transaction.date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
      );
      return formattedDate;
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
];
