import { store } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";



const usePayment = () => {
  const { token } = store.getState().auth;

  const form = useForm();
  
  const storePayment = async(payload: string) => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        service_code: payload
      }),
    });

    const result = await res.json();

    if (result.status !== 0) {
      throw new Error(result.message || "Email atau password salah");
    }
    return result;
  }

  const { mutate: mutatePayment, isPending: isPendingPayment } = useMutation({
    mutationFn: storePayment,
    onError(error: any) {
     
    },
    onSuccess(result) {
      
      
    },
  });

  // 5. PERBAIKAN: Tambahkan parameter `options` agar bisa menerima onSuccess dari komponen UI
  const handlePayment = (payload: string, options?: any) => {
    mutatePayment(payload, options);
  };

  return {form, isPendingPayment,handlePayment}
 
};

export default usePayment;
