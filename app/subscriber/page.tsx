import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { db } from "../_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

const SubscriberPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const clerk = await clerkClient(); // Primeiro resolva clerkClient()
  const user = await clerk.users.getUser(userId); // Agora você pode acessar users
  const currentMonthTransactions = await db.transactions.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
  const hasProPlan = user.publicMetadata?.subscriptionPlan === "pro";
  return (
    <>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl">Assinatura</h1>
        <div className="flex gap-4">
          <Card className="w-[430px]">
            <CardHeader className="relative border-b border-solid py-8">
              <h2 className="text-center text-2xl">Plano Básico</h2>
              <div className="flex justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-4xl">0</span>
                <span className="mt-3 text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-6">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl">
                    {" "}
                    Apenas 10 transações por mês{" "}
                    <span className="font-bold text-red-600">
                      {currentMonthTransactions}/10
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl"> Dashboard Financeira</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl"> Funcionalidades básicas</p>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon />
                  <p className="text-xl"> Relatórios de IA ilimitados</p>
                </div>
                <Button
                  className="w-full rounded-3xl border border-primary text-primary"
                  variant="ghost"
                >
                  GRATUITO{" "}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[430px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasProPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Atual
                </Badge>
              )}
              <h2 className="text-center text-2xl">Plano Pro</h2>
              <div className="flex justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-4xl">19</span>
                <span className="mt-3 text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-6">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl"> Transações ilimitadas</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl">Relatórios de IA ilimitados</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl"> Todas as funcionalidades</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="text-xl"> Área de membros</p>
                </div>

                <AcquirePlanButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriberPage;
