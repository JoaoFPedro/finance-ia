"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { useEffect, useState } from "react";
import {
  getInvestmentTotal,
  getSpentTotal,
  getDepositTotal,
  getTotalBalance,
} from "../_actions/get-transaction-values";
import { TransactionsType } from "@prisma/client";

interface PieChartProps {
  month: string;
}

const PieChartBalance = (month: PieChartProps) => {
  const [investmentTotal, setInvestmentTotal] = useState<number | null>(null);
  const [spentTotal, setSpentTotal] = useState<number | null>(null);
  const [balanceTotal, setBalanceTotal] = useState<number | null>(null);
  const [totalBalance, setTotalBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const totalInvestment = await getInvestmentTotal(month);
        const totalSpent = await getSpentTotal(month);
        const balance = await getDepositTotal(month);
        const totalBalanceSum = await getTotalBalance(month);

        setInvestmentTotal(totalInvestment);
        setSpentTotal(totalSpent);
        setBalanceTotal(balance);
        setTotalBalance(totalBalanceSum);
      } finally {
      }
    };
    fetchTotal();
  }, [month]);
  let totalDepositPieChart = 0;
  let totalBalancePieChart = 0;
  let totalInvestmentPieChart = 0;
  if (totalBalance && spentTotal) {
    totalDepositPieChart = (spentTotal / totalBalance) * 100;
    totalBalancePieChart = (balanceTotal! / (totalBalance ?? 0)) * 100;
    totalInvestmentPieChart = (investmentTotal! / (totalBalance ?? 0)) * 100;
  }
  const chartData = [
    {
      type: TransactionsType.DEPOSIT,
      amount: spentTotal,
      fill: "red",
    },
    {
      type: TransactionsType.INVESTMENT,
      amount: investmentTotal,
      fill: "white",
    },
    {
      type: TransactionsType.EXPENSE,
      amount: balanceTotal,
      fill: "green",
    },
  ];
  const chartConfig = {
    [TransactionsType.DEPOSIT]: {
      label: "Despesas",
      color: "green",
    },
    [TransactionsType.INVESTMENT]: {
      label: "Investimento",
      color: "white",
    },
    [TransactionsType.EXPENSE]: {
      label: "Depósito",
      color: "red",
    },
  } satisfies ChartConfig;

  return (
    <Card className="mt-6 flex flex-col p-12">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* TODO: Transformar em um componente  */}
      <div className="mb-4 items-center space-y-2 rounded-xl border p-4 shadow-inner shadow-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="rounded-md bg-[#FFFFFF08] p-1 text-primary" />

            <p>Ganhos</p>
          </div>

          <h1>{`${totalBalancePieChart.toFixed()}%`}</h1>
        </div>
      </div>
      <div className="mb-4 items-center space-y-2 rounded-xl border p-4 shadow-inner shadow-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDownIcon className="rounded-md bg-[#FFFFFF08] p-1 text-primary text-red-700" />

            <p>Gastos</p>
          </div>

          <h1 className="font-bold">{`${totalDepositPieChart.toFixed()}%`}</h1>
        </div>
      </div>
      <div className="mb-4 items-center space-y-2 rounded-xl border p-4 shadow-inner shadow-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBankIcon className="rounded-md bg-[#FFFFFF08] p-1" />

            <p>Investimentos</p>
          </div>

          <h1 className="font-bold">{`${totalInvestmentPieChart.toFixed()}%`}</h1>
        </div>
      </div>
    </Card>
  );
};

export default PieChartBalance;
