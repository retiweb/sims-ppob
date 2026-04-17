"use client"; // Wajib karena menggunakan useState

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { AtSignIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import useLogin from "./useLogin";
import FormWrapper from "@/components/common/forms/form-wrapper";
import FieldWrapper from "@/components/common/forms/field-wrapper";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { form, handleLogin, isPendingMutateLogin } = useLogin();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center px-6 md:px-20 space-y-10">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo.png" width={32} height={32} alt="Logo" />
          <h1 className="text-xl md:text-2xl font-bold">SIMS PPOB</h1>
        </div>

        <div className="max-w-87.5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            Masuk atau buat akun untuk memulai
          </h1>
        </div>

        <div className="w-full max-w-md flex flex-col space-y-4">
          <FormWrapper
            form={form}
            className="space-y-5"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <FieldWrapper
              name="email"
              control={form.control}
              render={({ field }) => (
                <InputGroup
                  className={`rounded-sm border-gray-200 border bg-white h-12 flex items-center px-3 ${form.formState.errors.email ? "border border-red-500" : ""}`}
                >
                  <AtSignIcon className="text-gray-400 w-5 h-5" />
                  <InputGroupInput
                    disabled={isPendingMutateLogin}
                    type="email"
                    placeholder="Masukan email anda"
                    className="border-none focus-visible:ring-0"
                    {...field}
                  />
                </InputGroup>
              )}
            />
            <FieldWrapper
              name="password"
              control={form.control}
              render={({ field }) => (
                <InputGroup
                  className={`rounded-sm border-gray-200 border bg-white h-12 flex items-center px-3 ${form.formState.errors.email ? "border border-red-500" : ""}`}
                >
                  <LockIcon className="text-gray-400 w-5 h-5" />
                  <InputGroupInput
                    disabled={isPendingMutateLogin}
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukan password anda"
                    className="border-none focus-visible:ring-0"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </InputGroup>
              )}
            />
            <div className="pt-4">
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 transition-colors text-white rounded-md w-full h-12 font-semibold"
              >
                {isPendingMutateLogin ? <Spinner /> : "Masuk"}
              </Button>
            </div>
          </FormWrapper>

          <p className="text-center text-sm text-gray-500">
            belum punya akun? registrasi{" "}
            <Link
              href="/auth/registration"
              className="text-red-500 font-bold cursor-pointer"
            >
              di sini
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/illustration-login.png"
          alt="Banner Login"
          fill
          className="object-cover"
          priority
          sizes="1"
        />
      </div>
    </div>
  );
};

export default LoginPage;
