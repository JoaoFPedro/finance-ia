import { Card, CardContent, CardHeader } from "./ui/card";
import TimeSelect from "./time-select";
interface NoDataProps {
  month: string;
}
const NoData = ({ month }: NoDataProps) => {
  const MONTH_OPTIONS = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];
  // Encontra o mês correspondente
  const selectedMonth =
    MONTH_OPTIONS.find((m) => m.value === month)?.label || "Desconhecido";
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
              Não foram encontradas transações para o mês:{" "}
              <span className="font-bold text-green-500">{selectedMonth}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NoData;
