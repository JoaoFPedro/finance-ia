import { Card, CardContent, CardHeader } from "./ui/card";
import AddTransactionButton from "./add-transaction-button";
import TimeSelect from "./time-select";
interface NoDataProps {
  canUserAddTransaction: boolean;
}
const NoData = ({ canUserAddTransaction }: NoDataProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-2">
        <TimeSelect />
        <Card className="w-full max-w-xl p-6 text-center">
          <CardContent>
            <CardHeader>
              <h2 className="mt-4 text-xl font-bold">
                Nenhum lançamento encontrado
              </h2>
            </CardHeader>
            <p className="mb-5 mt-2">
              Comece adicionando suas despesas para acompanhar suas finanças ou
              altere o mês para visualizar as despesas desejadas.
            </p>

            <AddTransactionButton
              totalMonthTransactions={canUserAddTransaction}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NoData;
