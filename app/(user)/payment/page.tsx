"use client";

import { useEffect, useState } from "react";
import SaldoSection from "@/components/common/saldo-section";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { CreditCard } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import usePayment from "./usePayment";
import { PaymentConfirmModal } from "./components/payment-confirm";
import { PaymentSuccessModal } from "./components/payment-success";
import { PaymentFailedModal } from "./components/payment-failed";


const PaymentPage = () => {
  const router = useRouter();
  const { selectedService } = useSelector((state: RootState) => state.payment); // Ganti ke slice kamu (checkout/payment)
  
  // States Modals
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handlePayment, isPendingPayment, getBalance } = usePayment();

  
  useEffect(() => {
    if (!selectedService) {
      router.replace("/dashboard");
    }
  }, [selectedService, router]);

  if (!selectedService) return null; // Mencegah kedip sebelum redirect

  const onConfirmPay = () => {
    handlePayment(selectedService.service_code, {
      onSuccess: () => {
        setShowConfirm(false);
        setShowSuccess(true);
        getBalance()
      },
      onError: (error: any) => {
        setShowConfirm(false);
        setErrorMessage(error.message);
        setShowFailed(true);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-20 items-center w-full">
      <SaldoSection />

      <div className="col-span-5 space-y-5">
        <h5 className="text-lg text-gray-600">Pembayaran</h5>
        <div className="flex gap-3 items-center">
          <Image
            src={selectedService.service_icon ?? "/images/404.png"}
            width={40}
            height={40}
            className="object-cover hover:scale-105 transition-transform duration-300"
            alt="logo payment"
          />
          <p className="text-lg font-bold text-gray-900">{selectedService.service_name}</p>
        </div>
      </div>

      <div className="col-span-1 md:col-span-5 flex flex-col space-y-4">
        {/* Input dibuat Read-Only dan hanya menampilkan tarif yang diformat */}
        <InputGroup className="rounded-md border-gray-300 border bg-gray-50 h-12 flex items-center px-4 transition-all">
          <CreditCard className="text-gray-400 w-5 h-5 mr-2" />
          <InputGroupInput
            type="text"
            readOnly
            value={formatRupiah(selectedService.service_tariff.toString())}
            className="border-none focus-visible:ring-0 w-full text-base font-semibold text-gray-700 bg-transparent"
          />
        </InputGroup>

        <Button
          onClick={() => setShowConfirm(true)}
          className="w-full h-12 font-semibold transition-all rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Bayar
        </Button>
      </div>

      {/* RENDER MODALS */}
      <PaymentConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={onConfirmPay}
        service={selectedService}
        isLoading={isPendingPayment}
      />

      <PaymentSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        service={selectedService}
      />

      <PaymentFailedModal
        isOpen={showFailed}
        onClose={() => setShowFailed(false)}
        service={selectedService}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default PaymentPage;