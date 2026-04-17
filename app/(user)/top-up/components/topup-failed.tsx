"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react"; // Ikon Silang / Gagal
import { Button } from "@/components/ui/button";

interface TopupFailedModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
}

export function TopupFailedModal({ isOpen, onClose, errorMessage }: TopupFailedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 flex flex-col items-center py-10">
        <DialogHeader className="flex flex-col items-center">
          {/* Ikon Gagal dengan background merah muda */}
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <XCircle className="w-16 h-16 text-red-500 stroke-[2px]" />
          </div>
          
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Top Up Gagal
          </DialogTitle>
        </DialogHeader>

        {/* Pesan Error */}
        <div className="text-center px-4 space-y-2">
          <p className="text-gray-500 font-medium">
            {errorMessage || "Maaf, sistem sedang tidak dapat memproses permintaan Anda saat ini. Silakan coba beberapa saat lagi."}
          </p>
        </div>

        {/* Tombol Tutup / Coba Lagi */}
        <div className="w-full pt-6">
          <Button 
            className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold transition-all rounded-md"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}