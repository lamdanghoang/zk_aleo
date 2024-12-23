import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";

export default function Banner() {
  return (
    <div className="w-full py-20 bg-white rounded-xl">
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-extrabold">
            Own Your Blockchain <br /> eContract Today
          </h1>
          <p className="text-2xl">Create and Manage your eContracts</p>

          <div>
            <Button
              variant="default"
              className="button text-white hover:bg-black/90 rounded-xl text-base"
            >
              Try it now!
            </Button>
          </div>
        </div>
        <Image
          priority
          src="/econtract-banner-2.png"
          alt="banner"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
