import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

const SummaryCards = () => {
  return (
    <div className="space-y-6">
      <SummaryCard
        title="Saldo"
        icon={<WalletIcon />}
        amount={2700}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investimento"
          icon={<PiggyBankIcon />}
          amount={3500}
        />
        <SummaryCard
          title="Receita"
          icon={<TrendingUpIcon className="text-primary" />}
          amount={8000}
        />
        <SummaryCard
          title="Despesas"
          icon={<TrendingDownIcon className="text-red-700" />}
          amount={2950}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
