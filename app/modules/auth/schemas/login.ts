import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Düzgün e-poçt daxil edin")
    .required("E-poçt tələb olunur"),

  password: yup
    .string()
    .required("Şifrə tələb olunur")
    .min(6, "Şifrə ən az 6 simvol olmalıdır"),
});
