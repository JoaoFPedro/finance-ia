import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { ReactNode } from "react";

const summaryData: {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}[] = [
  { title: "Saldo", icon: <WalletIcon />, amount: 2700, size: "large" },
  { title: "Investimento", icon: <PiggyBankIcon />, amount: 3500 },
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

const SummaryCards = () => {
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
