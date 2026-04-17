"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react"; // Ikon sukses
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TopupSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export function TopupSuccessModal({
  isOpen,
  onClose,
  amount,
}: TopupSuccessModalProps) {
  const router = useRouter();

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 flex flex-col items-center py-10">
        <DialogHeader className="flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 stroke-[2.5px]" />
          </div>

          <DialogTitle className="text-center text-xl font-bold">
            Top Up Sebesar
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-2">
          <p className="text-3xl font-extrabold text-gray-900">
            {formatRupiah(amount)}
          </p>
          <p className="text-gray-500 font-medium">Berhasil!</p>
        </div>

        {/* Tombol Kembali */}
        <div className="w-full pt-6">
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 font-bold"
            onClick={() => router.push("/dashboard")}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
