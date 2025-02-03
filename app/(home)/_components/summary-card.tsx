import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { ArrowDownUpIcon } from "lucide-react";

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
  console.log("title", title);
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
        <CardContent className="flex">
          <p
            className={`font-bold ${size === "large" ? "text-4xl" : "text-xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
          {title === "Saldo" && (
            <Button
              className="mb-auto ml-auto rounded-full text-sm"
              //  onClick={() => setdialogIsOpen(true)}
            >
              Adicionar Transação
              <ArrowDownUpIcon />
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
