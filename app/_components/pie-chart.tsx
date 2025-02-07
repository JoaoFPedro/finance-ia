"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Alert, AlertDescription } from "./ui/alert";
import { useEffect, useState } from "react";
import {
  getInvestmentTotal,
  getSpentTotal,
  getDepositTotal,
  getTotalBalance,
} from "../_actions/get-transaction-values/getValues";

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
      browser: "Deposito",
      visitors: (spentTotal! / (totalBalance ?? 0)) * 100,
      fill: "red",
    },
    {
      browser: "Investimento",
      visitors: (investmentTotal! / (totalBalance ?? 0)) * 100,
      fill: "white",
    },
    {
      browser: "Receita",
      visitors: (balanceTotal! / (totalBalance ?? 0)) * 100,
      fill: "green",
    },
  ];
  const chartConfig = {
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-1/9 mt-6 flex flex-col">
      <CardContent className="flex-1 pb-0">
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
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-5 flex-col space-y-3">
        <Alert>
          <AlertDescription className="flex justify-between">
            <div className="flex gap-2">
              <TrendingUpIcon className="rounded-md bg-[#FFFFFF08] p-1 text-primary" />

              <h1>Ganhos</h1>
            </div>

            <h1>{`${totalBalancePieChart.toFixed(1)}%`}</h1>
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertDescription className="flex justify-between">
            <div className="flex gap-2">
              <TrendingDownIcon className="rounded-md bg-[#FFFFFF08] p-1 text-primary text-red-700" />

              <h1>Gastos</h1>
            </div>

            <h1 className="font-bold">{`${totalDepositPieChart.toFixed(1)}%`}</h1>
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertDescription className="flex justify-between">
            <div className="flex w-full gap-2">
              <PiggyBankIcon className="rounded-md bg-[#FFFFFF08] p-1" />

              <h1>Investimentos</h1>
              <h1 className="font-bold">{`${totalInvestmentPieChart.toFixed(1)}%`}</h1>
            </div>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default PieChartBalance;
