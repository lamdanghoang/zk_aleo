/* eslint-disable */
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Wallet } from "@/components/wallet/WalletProvider";
import Providers from "@/components/wallet/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "zkSign",
  description: "zkSign app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
