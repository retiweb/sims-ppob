import z from "zod";

const MAX_FILE_SIZE = 500 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const profileSchema = z.object({
  first_name: z.string().min(1, "Nama depan wajib diisi"),
  last_name: z.string().min(1, "Nama belakang wajib diisi"),
});

export const profileImageSchema = z.object({
  profile_image: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Ukuran maksimal foto adalah 100KB`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Format foto harus JPEG atau PNG",
    ),
});
