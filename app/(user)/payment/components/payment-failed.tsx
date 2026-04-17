import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {XCircle } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useRouter } from "next/navigation";

// --- MODAL GAGAL ---
export function PaymentFailedModal({
  isOpen,
  onClose,
  service,
  errorMessage,
}: any) {
    const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 flex flex-col items-center py-10">
        <DialogHeader className="flex flex-col items-center">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <XCircle className="w-16 h-16 text-red-500 stroke-[2px]" />
          </div>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Pembayaran {service?.service_name} prabayar sebesar
          </DialogTitle>
        </DialogHeader>
        <div className="text-center px-4 space-y-1">
          <p className="text-3xl font-extrabold text-gray-900">
            Rp
            {service?.service_tariff
              ? formatRupiah(service.service_tariff.toString())
              : "0"}{" "}
            ?
          </p>
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        </div>
        <Button
          className="w-full mt-6 h-12 bg-red-500 hover:bg-red-600 text-white font-bold"
          onClick={() => router.push('/dashboard')}
        >
          Kembali ke beranda
        </Button>
      </DialogContent>
    </Dialog>
  );
}
