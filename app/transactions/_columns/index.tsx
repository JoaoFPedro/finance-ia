"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Transactions,
  TransactionsCategory,
  TransactionsPaymentMethod,
  TransactionsType,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, TrashIcon } from "lucide-react";
import EditTransacionButton from "../_components/edit-transaction-button";

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
        <Badge className="bg-muted font-bold text-red-600 hover:bg-muted">
          <CircleIcon className="mr-2 fill-red-600" size={10} />
          Gasto
        </Badge>
      ) : transaction.type === TransactionsType.INVESTMENT ? (
        <Badge className="text-white-600 bg-muted font-bold hover:bg-muted">
          <CircleIcon className="mr-2 fill-white" size={10} />
          Investimento
        </Badge>
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
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      const formattedDate = new Date(transaction.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      );
      return formattedDate;
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      const amount = Number(transaction.amount); // Garantir que é um número
      const formattedAmount = amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return formattedAmount;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex space-x-1">
          <EditTransacionButton transaction={transaction} />
          <Button size="icon" variant="ghost" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
