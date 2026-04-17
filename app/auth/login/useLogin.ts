"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { setLogin, setUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

type loginType = {
  email: string;
  password: string;
};

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (payload: loginType) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.status !== 0) {
      throw new Error(result.message || "Email atau password salah");
    }
    return result;
  };

  const getProfile = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  };

  const getBalance = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  };

  const { mutate: mutateLogin, isPending: isPendingMutateLogin } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: login,
    onError(error) {
      console.log(error);
      toast.error("Terjadi kesalahan");
    },
    onSuccess: async (result) => {
      const token = result.data.token;

      Cookies.set("token", token, { expires: 1 });
      dispatch(setLogin(token));

      try {
        const profile = await getProfile(token);
        const balance = await getBalance(token);

        if (profile.status === 0 && balance.status === 0) {
          const payload = {
            ...profile.data,
            balance: balance.data.balance,
          };
          dispatch(setUser(payload));
        }

        router.push("/dashboard");
        toast.success("Login Berhasil");
      } catch (error: any) {
        toast.error(error.message || "Terjadi kesalahan pada server");
      }
    },
  });

  const handleLogin = (payload: loginType) => mutateLogin(payload);

  return {
    form,
    handleLogin,
    isPendingMutateLogin,
  };
};

export default useLogin;
