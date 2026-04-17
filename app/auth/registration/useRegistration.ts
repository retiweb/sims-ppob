"use client";
import { registrationSchema } from "@/schemas/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type registrationType = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

const useRegistration = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
  });

  const storeUser = async (payload: registrationType) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  };

  const { mutate: mutateStoreUser, isPending: isPendingStoreUser } =
    useMutation({
      mutationKey: ["REGISTRATION"],
      mutationFn: storeUser,
      onError(error) {
        console.log(error);
        toast.error("Terjadi kesalahan");
      },
      onSuccess(result) {
        if(result.status == 102){
            toast.error(result.message)
        }else{
            toast.success("Berhasil melakukan pendaftaran")
            form.reset()
        }

      },
    });

  const handleStoreUser = (payload: registrationType) => mutateStoreUser(payload);

  return { form, handleStoreUser, isPendingStoreUser };
};

export default useRegistration;
