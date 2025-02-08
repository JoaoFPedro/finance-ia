"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import {
  //   getDepositTotal,
  //   getInvestmentTotal,
  //   getSpentTotal,
  getTotalBalance,
} from "../_actions/get-transaction-values";

interface ExpensesByCategoryProps {
  month: string;
}

const ExpensesByCategory = (month: ExpensesByCategoryProps) => {
  //   const [investmentTotal, setInvestmentTotal] = useState<number | null>(null);
  //   const [spentTotal, setSpentTotal] = useState<number | null>(null);
  //   const [balanceTotal, setBalanceTotal] = useState<number | null>(null);
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTotal = async () => {
      setLoading(true);

      try {
        // const totalInvestment = await getInvestmentTotal(month);
        // const totalSpent = await getSpentTotal(month);
        // const balance = await getDepositTotal(month);
        const totalBalanceSum = await getTotalBalance(month);
        console.log("GET_TOTAL_BALANCE***", totalBalanceSum);

        // setInvestmentTotal(totalInvestment);
        // setSpentTotal(totalSpent);
        // setBalanceTotal(balance);
        setTotalBalance(totalBalance);
      } finally {
        setLoading(false);
      }
    };
    fetchTotal();
  }, [month, totalBalance]);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div>
      <h1>Gastos por categoria:</h1>
      <Progress value={50} className="w-[60%]" />
    </div>
  );
};

export default ExpensesByCategory;
