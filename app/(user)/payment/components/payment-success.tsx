import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function PaymentSuccessModal({ isOpen, onClose, service }: any) {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 flex flex-col items-center py-10">
        <DialogHeader className="flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 stroke-[2.5px]" />
          </div>
          <DialogTitle className="text-center text-xl font-bold">Pembayaran {service?.service_name} prabayar sebesar</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-1">
          <p className="text-3xl font-extrabold text-gray-900">
            Rp{service?.service_tariff ? formatRupiah(service.service_tariff.toString()) : "0"}
          </p>
           <p className="text-sm text-red-500 mt-2">Berhasil</p>
        </div>
        <Button variant="ghost" className="w-full mt-6 text-red-500 font-bold" onClick={() => router.push("/dashboard")}>
          Kembali ke Beranda
        </Button>
      </DialogContent>
    </Dialog>
  );
}