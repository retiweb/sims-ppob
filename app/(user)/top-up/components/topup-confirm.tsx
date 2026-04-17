"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface TopupConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  isLoading?: boolean;
}

export function TopupConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
  isLoading,
}: TopupConfirmationModalProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 flex flex-col items-center py-8">
        <DialogHeader className="flex flex-col items-center">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <CreditCard className="w-12 h-12 text-red-500" />
          </div>
          <DialogTitle className="text-center text-lg font-medium text-gray-600">
            Anda yakin untuk Top Up sebesar
          </DialogTitle>
        </DialogHeader>

        <div className="text-center">
          <p className="text-3xl font-extrabold text-gray-900">
            {formatCurrency(amount)}
          </p>
        </div>

        <DialogFooter className="w-full flex-col sm:flex-col sm:space-x-0 space-y-3 sm:space-y-3 pt-6">
          <Button
            type="button"
            className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold transition-all"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Ya, Lanjutkan Top Up"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full h-12 text-gray-400 hover:text-gray-500 font-bold"
            onClick={onClose}
            disabled={isLoading}
          >
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
