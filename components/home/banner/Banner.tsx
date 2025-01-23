/* eslint-disable */

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();

  return (
    <div className="w-full py-10 md:py-20 bg-white rounded-xl px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-0">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Own Your Blockchain <br /> eContract Today
          </h1>
          <p className="text-xl md:text-2xl">
            Create and Manage your eContracts
          </p>

          <div className="flex justify-center md:justify-start">
            <Button
              variant="default"
              className="button text-white hover:bg-black/90 rounded-xl text-base"
              onClick={() => router.push("/dashboard")}
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
          className="w-[300px] md:w-[500px] h-auto"
        />
      </div>
    </div>
  );
}
