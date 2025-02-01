"use client";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import ToggleThemeButton from "./toggleButton";
// import ToggleThemeButton from "./toggleButton";

const Header = () => {
  return (
    <>
      <nav className="flex justify-between p-4">
        <div className="flex items-center gap-5">
          <Image src="/logo.png" alt="Finance AI" height={36} width={36} />
          <h1 className="-ml-3 text-2xl font-bold">finance.ai</h1>
          <div className="space-x-4">
            <Link href="/"> Dashboard</Link>
            <Link href="/transactions"> Transações</Link>
            <Link href="/subscriber"> Assinatura</Link>
          </div>
        </div>

        <div className="mr-12 flex">
          <UserButton showName appearance={{ baseTheme: dark }} />
          <ToggleThemeButton />
        </div>
      </nav>
    </>
  );
};

export default Header;
