import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-extrabold capitalize">
          Own Your Blockchain <br /> Document Today
        </h1>
        <p className="text-2xl">Mint and Manage your Non-Fungible Documents</p>
        <Button className="px-8 py-4 h-full">
          <span className="text-xl leading-snug font-bold">Aleo Wallet</span>
        </Button>
      </main>
    </div>
  );
}
