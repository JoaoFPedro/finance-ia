"use client";

import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { ReactNode } from "react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  investmentTotal: number;
  depositTotal: number;
  expensesTotal: number;
}
const SummaryCards = ({
  investmentTotal,
  depositTotal,
  expensesTotal,
}: SummaryCardsProps) => {
  const balanceTotalValue = expensesTotal - depositTotal - investmentTotal;

  const summaryData: {
    icon: ReactNode;
    title: string;
    amount: number;
    size?: "small" | "large";
  }[] = [
    {
      title: "Saldo",
      icon: <WalletIcon />,
      amount: balanceTotalValue,
      size: "large",
    },
    {
      title: "Investimento",
      icon: <PiggyBankIcon />,
      amount: investmentTotal ?? 0,
    },
    {
      title: "Receita",
      icon: <TrendingUpIcon className="text-primary" />,
      amount: depositTotal,
    },
    {
      title: "Despesas",
      icon: <TrendingDownIcon className="text-red-700" />,
      amount: expensesTotal,
    },
  ];

  console.log("SALDOTOTAL**", balanceTotalValue);
  return (
    <div className="space-y-6">
      <SummaryCard {...summaryData[0]} />

      <div className="grid grid-cols-3 gap-6">
        {summaryData.slice(1).map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
