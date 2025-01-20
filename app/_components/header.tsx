"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const goToTransaction = () => {
    router.push("/transactions");
  };
  const goToHome = () => {
    router.push("/");
  };
  return (
    <div className="flex justify-between border-red-600 p-4">
      <div className="flex items-center space-x-3">
        <Image src="/logo.png" alt="Finance AI" height={36} width={36} />
        <h1 className="text-center text-2xl font-bold">finance.ai</h1>
      </div>
      <div>
        <Button variant="ghost" onClick={goToHome}>
          Dashboard
        </Button>
        <Button variant="ghost" onClick={goToTransaction}>
          Transações
        </Button>
        <Button variant="ghost">Assinatura</Button>
      </div>
      <div>
        <UserButton showName appearance={{ baseTheme: dark }} />
      </div>
    </div>
  );
};

export default Header;
