"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { formatRupiah } from "@/lib/utils";

const SaldoSection = () => {
  const [showBalance, setShowBalance] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <>
      <div className="md:col-span-2 flex flex-col space-y-4">
        <Avatar className="w-20 h-20 border-2 border-gray-100">
          <AvatarImage src={auth.user?.profile_image ?? "/images/empty-profile.png"} alt="profile" />
          <AvatarFallback className="text-lg">KW</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h4 className="text-xl text-gray-600">Selamat datang,</h4>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {auth.user?.first_name} {auth.user?.last_name}
          </h2>
        </div>
      </div>

      <div className="md:col-span-3">
        <Card className="relative overflow-hidden bg-red-500 text-white border-none shadow-md h-40">
          <Image
            src="/images/bg-saldo.png"
            alt="Card Background"
            fill
            priority
            sizes="1"
            className="object-cover z-0"
          />
          <CardContent className="flex flex-col justify-between h-full p-6 relative z-10 gap-4">
            <h4 className="text-lg font-medium opacity-90">Saldo anda</h4>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-wider">
                {showBalance ? `Rp. ${formatRupiah(String(auth.user?.balance))}` : "Rp •••••••"}
              </h2>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity focus:outline-none"
              >
                {showBalance ? (
                  <>
                    Sembunyikan saldo <EyeOffIcon className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Lihat saldo <EyeIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SaldoSection;
