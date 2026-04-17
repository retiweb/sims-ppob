"use client"; // Wajib karena menggunakan useState

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { AtSignIcon, LockIcon, EyeIcon, EyeOffIcon, User } from "lucide-react";
import Image from "next/image";
import FormWrapper from "@/components/common/forms/form-wrapper";
import useRegistration from "./useRegistration";
import FieldWrapper from "@/components/common/forms/field-wrapper";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { form, handleStoreUser, isPendingStoreUser } = useRegistration();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center px-6 md:px-20 space-y-10">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo.png" width={32} height={32} alt="Logo" />
          <h1 className="text-xl md:text-2xl font-bold">SIMS PPOB</h1>
        </div>

        <div className="max-w-87.5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            Lengkapi data untuk membuat akun
          </h1>
        </div>

        <div className="w-full max-w-md flex flex-col">
          <FormWrapper
            form={form}
            onSubmit={form.handleSubmit(handleStoreUser)}
            className="space-y-4"
          >
            {/* FIELD: EMAIL */}
            <FieldWrapper
              name="email"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-1">
                  <InputGroup
                    className={`rounded-sm border bg-white h-12 flex items-center px-3 transition-colors ${
                      form.formState.errors.email
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <AtSignIcon className="text-gray-400 w-5 h-5" />
                    <InputGroupInput
                      disabled={isPendingStoreUser}
                      {...field}
                      type="email"
                      placeholder="masukan email anda"
                      className="border-none focus-visible:ring-0"
                    />
                  </InputGroup>
                </div>
              )}
            />

            {/* FIELD: NAMA DEPAN */}
            <FieldWrapper
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <InputGroup
                  className={`rounded-sm border bg-white h-12 flex items-center px-3 ${form.formState.errors.first_name ? "border-red-500" : "border-gray-200"}`}
                >
                  <User className="text-gray-400 w-5 h-5" />
                  <InputGroupInput
                    disabled={isPendingStoreUser}
                    {...field}
                    type="text"
                    placeholder="nama depan"
                    className="border-none focus-visible:ring-0"
                  />
                </InputGroup>
              )}
            />

            {/* FIELD: NAMA BELAKANG */}
            <FieldWrapper
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <InputGroup
                  className={`rounded-sm border bg-white h-12 flex items-center px-3 ${form.formState.errors.last_name ? "border-red-500" : "border-gray-200"}`}
                >
                  <User className="text-gray-400 w-5 h-5" />
                  <InputGroupInput
                    disabled={isPendingStoreUser}
                    {...field}
                    type="text"
                    placeholder="nama belakang"
                    className="border-none focus-visible:ring-0"
                  />
                </InputGroup>
              )}
            />

            {/* FIELD: PASSWORD */}
            <FieldWrapper
              name="password"
              control={form.control}
              render={({ field }) => (
                <InputGroup
                  className={`rounded-sm border bg-white h-12 flex items-center px-3 ${form.formState.errors.password ? "border-red-500" : "border-gray-200"}`}
                >
                  <LockIcon className="text-gray-400 w-5 h-5" />
                  <InputGroupInput
                    disabled={isPendingStoreUser}
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="buat password"
                    className="border-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
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

            {/* FIELD: KONFIRMASI PASSWORD */}
            <FieldWrapper
              name="confirm_password"
              control={form.control}
              render={({ field }) => (
                <InputGroup
                  className={`rounded-sm border bg-white h-12 flex items-center px-3 ${form.formState.errors.confirm_password ? "border-red-500" : "border-gray-200"}`}
                >
                  <LockIcon className="text-gray-400 w-5 h-5" />
                  <InputGroupInput
                    disabled={isPendingStoreUser}
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="konfirmasi password"
                    className="border-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
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
                disabled={isPendingStoreUser}
              >
                {isPendingStoreUser ? <Spinner /> : "Registrasi"}
              </Button>
            </div>
          </FormWrapper>
          <p className="text-center text-sm text-gray-500">
            sudah punya akun? login{" "}
            <Link href="/auth/login" className="text-red-500 font-bold cursor-pointer">
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

export default RegistrationPage;
