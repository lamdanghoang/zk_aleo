"use client";
import Banner from "@/components/home/banner/Banner";
import CustomSection from "@/components/home/section/CustomSection";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-14 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start">
        <Banner />
        <CustomSection section={benefits.section} items={benefits.items} />
        <CustomSection section={features.section} items={features.items} />
      </main>
    </div>
  );
}

const benefits = {
  section: {
    title: "The Benefits of using eContract",
  },
  items: [
    {
      icon: "/storage.svg",
      title: "Convenient in managing, storing & searching contracts",
    },
    {
      icon: "/timer.svg",
      title: "Save time & costs on storage, preservation, transportation",
    },
    {
      icon: "/contract.svg",
      title: "Convenience in signing contracts",
    },
    {
      icon: "/blockchain.svg",
      title: "Ability to integrate with operational systems",
    },
  ],
};

const features = {
  section: {
    title: "Outstanding features",
    desc: "Multi-utility electronic contracting platform that makes it easy to operate and grow your business.",
  },
  items: [
    {
      icon: "/service.svg",
      title: "Full Service – One–stop–solution",
      desc: "Organize management to initiate, adjust, approve, Easily manage, initiate, search contracts",
    },
    {
      icon: "/signature.svg",
      title: "Support and integrate all digital signature standards",
      desc: "Platform supports signing with all digital signatures and all types of digital signatures",
    },
    {
      icon: "/management.svg",
      title: "Smart Contract Management",
      desc: "Share contracts, sign threads, set up viewing threads, manage users/user groups",
    },
    {
      icon: "/system.svg",
      title: "Electronic identification system integration",
      desc: "Support and integrate electronic identification systems",
    },
  ],
};
