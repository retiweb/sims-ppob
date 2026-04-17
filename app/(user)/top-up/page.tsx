"use client";

import { useEffect, useState } from "react";
import SaldoSection from "@/components/common/saldo-section";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { CreditCard } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { TopupSuccessModal } from "./components/topup-success";
import useTopup from "./useTopup";
import FormWrapper from "@/components/common/forms/form-wrapper";
import FieldWrapper from "@/components/common/forms/field-wrapper";
import { Spinner } from "@/components/ui/spinner";
import { TopupConfirmationModal } from "./components/topup-confirm";
import { TopupFailedModal } from "./components/topup-failed";

const TopupPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successAmount, setSuccessAmount] = useState(0);
  const [showFailed, setShowFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { form, handleTopup, isPendingTopup } = useTopup();
  const watchedAmount = form.watch("top_up_amount");

  const listNominal = [
    { label: "10.000", value: 10000 },
    { label: "20.000", value: 20000 },
    { label: "50.000", value: 50000 },
    { label: "100.000", value: 100000 },
    { label: "250.000", value: 250000 },
    { label: "500.000", value: 500000 },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-32 w-full bg-gray-200 animate-pulse rounded-xl"></div>;
  }

  const isButtonDisabled =
    !watchedAmount || Number(watchedAmount) < 10000 || isPendingTopup;

  const onSubmitForm = () => {
    setShowConfirm(true);
  };

  const onConfirmTopup = () => {
    const data = form.getValues();
    handleTopup(data, {
      onSuccess: () => {
        setSuccessAmount(data.top_up_amount);
        setShowConfirm(false);
        setShowSuccess(true);
        form.reset();
      },
      onError: (error:any) => {
        setShowConfirm(false); 
        setErrorMessage(error.message || "Terjadi kesalahan pada server"); 
        setShowFailed(true); 
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-20 items-center w-full">
      <SaldoSection />

      <div className="col-span-5">
        <h5 className="text-lg text-gray-600">Silahkan masukan</h5>
        <h3 className="text-3xl font-bold text-gray-900">Nominal Top Up</h3>
      </div>

      <div className="col-span-1 md:col-span-3 flex flex-col space-y-4">
        <FormWrapper
          className="space-y-4"
          form={form}
          onSubmit={form.handleSubmit(onSubmitForm)} // Perbaikan: Panggil fungsi modal konfirmasi
        >
          <FieldWrapper
            control={form.control}
            name="top_up_amount"
            render={({ field }) => (
              <div className="flex flex-col space-y-1">
                <InputGroup
                  className={`rounded-md border bg-white h-12 flex items-center px-4 transition-all ${
                    form.formState.errors.top_up_amount
                      ? "border-red-500"
                      : "border-gray-300 focus-within:border-red-500"
                  }`}
                >
                  <CreditCard className="text-gray-400 w-5 h-5 mr-2" />
                  <InputGroupInput
                    type="text"
                    placeholder="masukan nominal Top Up"
                    className="border-none focus-visible:ring-0 w-full text-base"
                    // Tampilkan format rupiah, tapi simpan angka murni
                    value={
                      field.value ? formatRupiah(field.value.toString()) : ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(Number(rawValue));
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </InputGroup>
                {form.formState.errors.top_up_amount && (
                  <span className="text-red-500 text-[10px] text-right">
                    {form.formState.errors.top_up_amount.message}
                  </span>
                )}
              </div>
            )}
          />

          <Button
            disabled={isButtonDisabled}
            className={`w-full h-12 font-semibold transition-all rounded-md ${
              isButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            type="submit"
          >
            {isPendingTopup ? <Spinner className="w-4 h-4" /> : "Top Up"}
          </Button>
        </FormWrapper>
      </div>

      <div className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-3 gap-3">
          {listNominal.map((lm, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              onClick={() => {
                form.setValue("top_up_amount", lm.value, {
                  shouldValidate: true,
                });
              }}
              className={`h-12 border-gray-300 transition-all rounded-md ${
                watchedAmount === lm.value
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "bg-white hover:border-red-500 hover:text-red-500"
              }`}
            >
              Rp{lm.label}
            </Button>
          ))}
        </div>
      </div>

      <TopupSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        amount={successAmount}
      />

      <TopupConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={onConfirmTopup}
        amount={Number(watchedAmount)}
        isLoading={isPendingTopup}
      />

      <TopupFailedModal
        isOpen={showFailed}
        onClose={() => setShowFailed(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default TopupPage;
