"use client";

import { setBalance } from "@/features/auth/authSlice";
import { topupSchema } from "@/schemas/topup";
import { RootState } from "@/store"; // Pastikan import RootState
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

// Gunakan tipe dari schema Zod
type TopupSchema = z.infer<typeof topupSchema>;

const useTopup = () => {
  const dispatch = useDispatch();
  // 1. PERBAIKAN: Gunakan useSelector agar reaktif terhadap perubahan token
  const token = useSelector((state: RootState) => state.auth.token);

  const form = useForm<TopupSchema>({
    resolver: zodResolver(topupSchema),
    defaultValues: {
      top_up_amount: 0,
    },
  });

  const storeTopup = async (payload: TopupSchema) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      // 2. PERBAIKAN: Payload sekarang berbentuk object {"top_up_amount": 100000}
      body: JSON.stringify(payload), 
    });

    const result = await res.json();

    if (result.status !== 0) {
      throw new Error(result.message || "Terjadi kesalahan");
    }
    return result;
  };

  const { mutate: mutateTopup, isPending: isPendingTopup } = useMutation({
    mutationFn: storeTopup,
    onError(error: any) {
      // 3. PERBAIKAN: Tangkap pesan error dari API (misal: "Parameter tidak valid")
      toast.error(error.message || "Terjadi kesalahan server");
    },
    onSuccess(result) {
      toast.success(result.message);
      // 4. PERBAIKAN: Ambil nilai 'balance' dari dalam object result.data
      if (result.data?.balance) {
        dispatch(setBalance(result.data.balance));
      }
    },
  });

  // 5. PERBAIKAN: Tambahkan parameter `options` agar bisa menerima onSuccess dari komponen UI
  const handleTopup = (payload: TopupSchema, options?: any) => {
    mutateTopup(payload, options);
  };

  return { form, handleTopup, isPendingTopup };
};

export default useTopup;