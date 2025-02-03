"use client";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { ReactNode, useEffect, useState } from "react";
import { getInvestmentTotal } from "@/app/_actions/transaction-values/getValues";

const SummaryCards = () => {
  const [investmentTotal, setInvestmentTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await getInvestmentTotal();
      setInvestmentTotal(total);
      console.log("TOTAL", total);
    };

    fetchTotal();
  }, []);

  const summaryData: {
    icon: ReactNode;
    title: string;
    amount: number;
    size?: "small" | "large";
  }[] = [
    { title: "Saldo", icon: <WalletIcon />, amount: 2700, size: "large" },
    {
      title: "Investimento",
      icon: <PiggyBankIcon />,
      amount: investmentTotal ?? 0,
    },
    {
      title: "Receita",
      icon: <TrendingUpIcon className="text-primary" />,
      amount: 8000,
    },
    {
      title: "Despesas",
      icon: <TrendingDownIcon className="text-red-700" />,
      amount: 2950,
    },
  ];

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
