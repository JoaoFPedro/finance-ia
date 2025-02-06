"use client";
import {
  getBalanceTotal,
  getInvestmentTotal,
  getSpentTotal,
} from "@/app/_actions/get-transaction-values/getValues";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
}
const SummaryCards = (month: SummaryCardsProps) => {
  const [investmentTotal, setInvestmentTotal] = useState<number | null>(null);
  const [spentTotal, setSpentTotal] = useState<number | null>(null);
  const [balanceTotal, setBalanceTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      setLoading(true);
      try {
        const totalInvestment = await getInvestmentTotal(month);
        const totalSpent = await getSpentTotal(month);
        const balance = await getBalanceTotal(month);
        setInvestmentTotal(totalInvestment);
        setSpentTotal(totalSpent);
        setBalanceTotal(balance);
      } finally {
        setLoading(false);
      }
    };
    fetchTotal();
  }, [month]);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  const balanceTotalValue =
    (balanceTotal ?? 0) - (spentTotal ?? 0) - (investmentTotal ?? 0);

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
      amount: balanceTotal ?? 0,
    },
    {
      title: "Despesas",
      icon: <TrendingDownIcon className="text-red-700" />,
      amount: spentTotal ?? 0,
    },
  ];

  console.log("BALANCE**", balanceTotal);
  console.log("SPENT**", spentTotal);
  console.log("INVESTMENT**", investmentTotal);

  console.log("SALDOTOTAL**", balanceTotalValue);
  return (
    <div className="w-1/2 space-y-6">
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
