import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";

import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  console.log("size***", size);
  return (
    <>
      <Card>
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
        <CardContent>
          <p
            className={`font-bold ${size === "large" ? "text-4xl" : "text-xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
