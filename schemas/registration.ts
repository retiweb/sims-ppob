import z from "zod";

export const registrationSchema = z
  .object({
    email: z.string().min(1, "Email wajib diisi").email("Email tidak valid"),
    first_name: z.string().min(1, "Nama depan wajib diisi"),
    last_name: z.string().min(1, "Nama belakang wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak sama",
    path: ["confirm_password"],
  });
