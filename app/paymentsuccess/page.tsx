import { Card, CardContent, CardHeader } from "../_components/ui/card";

const NoData = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-2">
        <Card className="w-full max-w-xl p-6 text-center">
          <CardContent>
            <CardHeader>
              <h2 className="mt-4 text-xl font-bold">
                Obrigado por comprar com a gente!{" "}
              </h2>
            </CardHeader>
            <p className="mb-5 mt-2">
              Seu plano PRO e tudo que ele oferece será ativado em minutos!{" "}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NoData;
