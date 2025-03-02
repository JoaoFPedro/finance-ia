import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TRANSACTIONS_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Transactions,
  TransactionsPaymentMethod,
  TransactionsType,
} from "@prisma/client";
import Image from "next/image";

interface LastTransactionsCategoryProps {
  lastTransactions: Transactions[];
}

const LastTransactions = ({
  lastTransactions,
}: LastTransactionsCategoryProps) => {
  const getPriceColor = (transactions: Transactions) => {
    if (transactions.type === TransactionsType.EXPENSE) {
      return "text-red-500";
    }
    if (transactions.type === TransactionsType.DEPOSIT) {
      return "text-green-500";
    }
    return "text-white";
  };

  const getIcon = (transactions: Transactions) => {
    if (
      transactions.paymentMethod === TransactionsPaymentMethod.CASH ||
      transactions.paymentMethod === TransactionsPaymentMethod.PIX
    ) {
      return "pix.svg";
    }
    if (
      transactions.paymentMethod === TransactionsPaymentMethod.CREDIT_CARD ||
      transactions.paymentMethod === TransactionsPaymentMethod.DEBIT_CARD
    ) {
      return "credit-card.svg";
    }
    return "bankTransfer.svg";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transações</CardTitle>
        <Button variant="ghost" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {lastTransactions.map((transactions) => (
          <div
            key={transactions.id}
            className="flex items-center justify-between space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3">
                <Image
                  src={`/${getIcon(transactions)}`}
                  height={50}
                  width={50}
                  alt="PIX"
                  className="h-8 w-8 bg-white bg-opacity-[2%]"
                />
              </div>{" "}
              <div>
                <p className="text-sm font-bold">
                  {TRANSACTIONS_CATEGORY_LABELS[transactions.category]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                    .format(transactions.createdAt)
                    .replace("de", " ")
                    .replace("de", "")}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getPriceColor(transactions)}`}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(transactions.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LastTransactions;
