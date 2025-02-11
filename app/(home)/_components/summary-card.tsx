"use client";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  color?: string;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  color,
}: SummaryCardProps) => {
  // const [dialogIsOpen, setdialogIsOpen] = useState(false);

  return (
    <>
      <Card className="bg-[#161716]">
        <CardHeader>
          <div className="flex items-center gap-3">
            {icon}
            <p
              className={`${
                size === "large"
                  ? "opacity-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              {" "}
              {title}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p
            className={`font-bold ${size === "large" ? "text-4xl" : "text-xl"} ${color === "red" ? "text-red-500" : "text-white"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
          {size === "large" && <AddTransactionButton />}
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
