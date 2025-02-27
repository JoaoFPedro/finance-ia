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

import { TransactionsType } from "@prisma/client";

interface PieChartProps {
  investmentTotal: number;
  depositTotal: number;
  expensesTotal: number;
}

const PieChartBalance = ({
  investmentTotal,
  depositTotal,
  expensesTotal,
}: PieChartProps) => {
  const chartData = [
    {
      type: TransactionsType.DEPOSIT,
      amount: depositTotal,
      fill: "green",
    },
    {
      type: TransactionsType.INVESTMENT,
      amount: investmentTotal,
      fill: "white",
    },
    {
      type: TransactionsType.EXPENSE,
      amount: expensesTotal,
      fill: "red",
    },
  ];
  const chartConfig = {
    [TransactionsType.DEPOSIT]: {
      label: "Ganhos",
      color: "green",
    },
    [TransactionsType.INVESTMENT]: {
      label: "Investimento",
      color: "white",
    },
    [TransactionsType.EXPENSE]: {
      label: "Gastos",
      color: "red",
    },
  } satisfies ChartConfig;
  const percentageExpensesTotal = expensesTotal / 100;
  const percentageDepositTotal = depositTotal / 100;
  const percentageInvestmentTotal = investmentTotal / 100;

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
      <div className="mb-4 w-full items-center space-y-2 rounded-xl border p-3 shadow-inner shadow-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="rounded-md bg-[#FFFFFF08] p-1 text-primary" />

            <p>Ganhos</p>
          </div>

          <h1>{`${percentageDepositTotal.toFixed()}%`}</h1>
        </div>
      </div>
      <div className="mb-4 items-center space-y-2 rounded-xl border p-4 shadow-inner shadow-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDownIcon className="rounded-md bg-[#FFFFFF08] p-1 text-primary text-red-700" />

            <p>Gastos</p>
          </div>

          <h1 className="font-bold">{`${percentageExpensesTotal.toFixed()}%`}</h1>
        </div>
      </div>
      <div className="mb-4 items-center space-y-2 rounded-xl border p-4 shadow-inner shadow-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBankIcon className="rounded-md bg-[#FFFFFF08] p-1" />

            <p>Investimentos</p>
          </div>

          <h1 className="font-bold">{`${percentageInvestmentTotal.toFixed()}%`}</h1>
        </div>
      </div>
    </Card>
  );
};

export default PieChartBalance;
