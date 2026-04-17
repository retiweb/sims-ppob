import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";


export function PaymentConfirmModal({ isOpen, onClose, onConfirm, service, isLoading }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100 flex flex-col items-center py-8">
        <DialogHeader className="flex flex-col items-center">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <Wallet className="w-12 h-12 text-red-500" />
          </div>
          <DialogTitle className="text-center text-lg font-medium text-gray-600">
            Beli {service?.service_name} senilai
          </DialogTitle>
        </DialogHeader>
        <p className="text-3xl font-extrabold text-gray-900">
          Rp{service?.service_tariff ? formatRupiah(service.service_tariff.toString()) : "0"} ?
        </p>
        <DialogFooter className="w-full flex-col sm:flex-col sm:space-x-0 space-y-3 sm:space-y-3 pt-6">
          <Button onClick={onConfirm} disabled={isLoading} className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold">
            {isLoading ? <Spinner /> : "Ya, Lanjutkan Bayar"}
          </Button>
          <Button variant="ghost" onClick={onClose} disabled={isLoading} className="w-full h-12 text-gray-400 font-bold">
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}