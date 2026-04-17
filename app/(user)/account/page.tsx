"use client";

import Image from "next/image";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { AtSign, User, PencilIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import useAccount from "./useAccount";
import FormWrapper from "@/components/common/forms/form-wrapper";
import FieldWrapper from "@/components/common/forms/field-wrapper";
import { Spinner } from "@/components/ui/spinner";

const AccountPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleLogout = async () => {
    dispatch(setLogout());
    Cookies.remove("token");
    router.push("/auth/login");
  };
  const {
    form,
    handleUpdateProfile,
    isPendingUpdateProfile,
    handleUpdateProfileImage,
    isPendingUpdateProfileImage,
  } = useAccount();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdateProfileImage(file);
    }
  };

  useEffect(() => {
    setIsFetching(true);
  }, [user]);

  if (!isFetching) return null;

  return (
    <div className="flex flex-col items-center py-10 w-full max-w-2xl mx-auto space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <div className="w-40 h-40 rounded-full border-2 border-gray-100 shadow-sm overflow-hidden flex items-center justify-center bg-gray-50">
            <Image
              src={user?.profile_image ?? "/images/empty-profile.png"} // Ganti dengan path foto profil Anda
              fill
              className={`object-cover transition-all ${isPendingUpdateProfileImage ? "blur-[2px] opacity-70" : "group-hover:scale-105"}`}
              alt="Profile"
              priority
            />
            {isPendingUpdateProfileImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white transition-opacity rounded-full">
                <Spinner className="w-8 h-8 animate-spin" />
                <span className="text-[10px] mt-1 font-medium">
                  Uploading...
                </span>
              </div>
            )}

            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              disabled={isPendingUpdateProfileImage}
            />
          </div>

          <label
            htmlFor="profile-upload"
            className={`absolute bottom-0 right-1 p-2 rounded-full border border-gray-200 shadow-md transition-all ${
              isPendingUpdateProfileImage
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white cursor-pointer hover:bg-red-50 hover:border-red-200 group-hover:scale-110"
            }`}
          >
            <PencilIcon
              className={`w-4 h-4 ${isPendingUpdateProfileImage ? "text-gray-400" : "text-gray-700"}`}
            />
          </label>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          {user?.first_name} {user?.last_name}
        </h2>
      </div>

      <FormWrapper
        form={form}
        onSubmit={form.handleSubmit(handleUpdateProfile)}
        className="space-y-5 w-full"
      >
        <div className="w-full flex flex-col space-y-4">
          <Field className="w-full">
            <FieldLabel className="font-semibold mb-2">Email</FieldLabel>
            <InputGroup
              className={`rounded-md border bg-white h-12 flex items-center px-4 transition-colors border-gray-300`}
            >
              <AtSign className="text-gray-400 w-5 h-5 mr-2" />
              <InputGroupInput
                type="email"
                placeholder="email@anda.com"
                className="border-none focus-visible:ring-0 w-full"
                value={user?.email}
                readOnly
              />
            </InputGroup>
          </Field>

          <FieldWrapper
            name="first_name"
            control={form.control}
            render={({ field }) => (
              <Field className="w-full">
                <FieldLabel className="font-semibold mb-2">
                  Nama Depan
                </FieldLabel>
                <InputGroup
                  className={`rounded-md border bg-white h-12 flex items-center px-4 transition-colors ${
                    form.formState.errors.first_name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <User className="text-gray-400 w-5 h-5 mr-2" />
                  <InputGroupInput
                    {...field}
                    type="text"
                    placeholder="Nama Depan"
                    className="border-none focus-visible:ring-0 w-full"
                  />
                </InputGroup>
              </Field>
            )}
          />

          <FieldWrapper
            name="last_name"
            control={form.control}
            render={({ field }) => (
              <Field className="w-full">
                <FieldLabel className="font-semibold mb-2">
                  Nama Belakang
                </FieldLabel>
                <InputGroup
                  className={`rounded-md border bg-white h-12 flex items-center px-4 transition-colors ${
                    form.formState.errors.last_name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <User className="text-gray-400 w-5 h-5 mr-2" />
                  <InputGroupInput
                    {...field}
                    type="text"
                    placeholder="Nama Belakang"
                    className="border-none focus-visible:ring-0 w-full"
                  />
                </InputGroup>
              </Field>
            )}
          />
        </div>

        <div className="w-full flex flex-col space-y-4 pt-4">
          {/* Tombol Simpan / Edit */}
          <Button
            type="submit"
            className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all rounded-md"
          >
            {isPendingUpdateProfile ? <Spinner /> : "Simpan Profil"}
          </Button>

          {/* Tombol Logout */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-red-500 text-red-500 hover:bg-red-50 font-semibold transition-all rounded-md"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AccountPage;
