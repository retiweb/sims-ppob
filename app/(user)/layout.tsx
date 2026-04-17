"use client";

import Navbar from "@/components/common/navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    // Gunakan min-h-screen dan hindari w-screen (gunakan w-full agar tidak ada scroll horizontal)
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;