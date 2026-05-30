import * as yup from "yup";

export const contactUsSchema = yup.object({
  fullName: yup.string().required("Ad və soyad daxil edin"),
  email: yup
    .string()
    .email("Düzgün e-poçt daxil edin")
    .required("E-poçt daxil edin"),
  phoneNumber: yup.string().required("Telefon daxil edin"),
  subject: yup.string().required("Mövzu daxil edin"),
  reason: yup.string().required(),
  message: yup
    .string()
    .min(10, "Mesaj ən azı 10 simvol olmalıdır")
    .required("Mesaj daxil edin"),
});
