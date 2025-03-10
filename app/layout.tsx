import type { Metadata } from "next";
import "./globals.css";
// import ToggleThemeButton from "./_components/toggleButton";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Mulish } from "next/font/google";
import Header from "./_components/header";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <Header />

          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
