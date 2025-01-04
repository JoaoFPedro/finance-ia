import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <div className="flex items-center gap-2 text-lg">
          <Image src="/logo.png" alt="Finance AI" height={36} width={36} />
          <h1 className="text-xl font-bold">finance.ai</h1>
        </div>

        <div className="ml-2 mt-8">
          <h1 className="mb-4 text-4xl">Bem Vindo</h1>
          <p className="mb-3 text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
        </div>
        <Button variant="outline">
          <LogInIcon />
          Fazer Login
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/loginImage.png"
          alt="Faça Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
