"use client";

import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { Wallet, FingerprintIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Header() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      console.log(publicKey);
      router.push("/dashboard");
    }
  }, [connected, router]);

  return (
    <header className="max-w-5xl mx-auto mt-6 sticky top-6 z-50 w-full px-4 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-3xl">
      <div className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <FingerprintIcon className="h-6 w-6" />
          <span className="font-semibold text-xl">zkSign</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="px-3 py-2 flex items-center gap-2 border rounded-2xl bg-white">
            <Wallet className="h-4 w-4" />
            <span>0</span>
          </div>
          <div className="px-3 py-2 flex items-center gap-2 border rounded-3xl bg-white">
            <Image
              src={"secondary-icon-dark.svg"}
              alt="Aleo"
              width={24}
              height={24}
            />
            <span>Aleo</span>
          </div>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
