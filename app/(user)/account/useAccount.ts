import { setUser } from "@/features/auth/authSlice";
import { profileSchema } from "@/schemas/profle";
import { store } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type profileType = {
  first_name: string;
  last_name: string;
};

const useAccount = () => {
  const { user, token } = store.getState().auth;
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
    },
  });

  const updateProfile = async (payload: profileType) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (result.status !== 0) {
      throw new Error(result.message || "Terjadi kesalahan");
    }

    return result;
  };

  const updateProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/image`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const result = await res.json();

    if (result.status !== 0) {
      throw new Error(result.message || "Terjadi kesalahan");
    }

    return result;
  };

  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } =
    useMutation({
      mutationFn: updateProfile,
      onError(error) {
        console.log(error);
        toast.error("Terjadi kesalahan");
      },
      onSuccess(result) {
        toast.success(result.message);
        dispatch(setUser(result.data));
      },
    });

  const { mutate: mutateUpdateProfileImage, isPending: isPendingUpdateProfileImage} = useMutation({
    mutationFn: updateProfileImage,
      onError(error) {
        console.log(error);
        toast.error("Terjadi kesalahan");
      },
      onSuccess(result) {
        toast.success(result.message);
        dispatch(setUser(result.data));
      },
  })

  const handleUpdateProfile = (payload: profileType) =>
    mutateUpdateProfile(payload);

  const handleUpdateProfileImage = (file: File) => mutateUpdateProfileImage(file)

  return { form, handleUpdateProfile, isPendingUpdateProfile, handleUpdateProfileImage, isPendingUpdateProfileImage };
};

export default useAccount;
