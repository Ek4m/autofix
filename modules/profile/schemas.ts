import * as yup from "yup";

export const updatePasswordSchema = yup.object({
  oldPassword: yup.string().required("Cari şifrə tələb olunur"),

  newPassword: yup
    .string()
    .required("Yeni şifrə tələb olunur")
    .min(8, "Yeni şifrə minimum 8 simvol olmalıdır")
    .matches(/[A-Z]/, "Yeni şifrədə ən azı 1 böyük hərf olmalıdır")
    .matches(/[a-z]/, "Yeni şifrədə ən azı 1 kiçik hərf olmalıdır")
    .matches(/[0-9]/, "Yeni şifrədə ən azı 1 rəqəm olmalıdır")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`;'"]/,
      "Yeni şifrədə ən azı 1 xüsusi simvol olmalıdır",
    ),
  newPasswordRetyped: yup
    .string()
    .required("Şifrənin təkrarı tələb olunur")
    .oneOf([yup.ref("newPassword")], "Şifrələr eyni deyil"),
});

export const mechanicFormSchema = yup.object({
  profession: yup
    .array()
    .of(yup.string().required())
    .min(1, "Ən azı 1 ixtisas seçilməlidir")
    .required("İxtisas seçilməlidir"),

  objectName: yup
    .string()
    .trim()
    .min(2, "Qaraj adı çox qısadır")
    .max(100, "Qaraj adı çox uzundur")
    .required("Qaraj adı mütləqdir"),

  rawAddress: yup
    .string()
    .trim()
    .min(5, "Ünvan çox qısadır")
    .max(255, "Ünvan çox uzundur")
    .required("Ünvan mütləqdir"),

  locationUrl: yup
    .string()
    .trim()
    .url("Düzgün link daxil edin")
    .required("Məkan linki mütləqdir"),

  bio: yup
    .string()
    .trim()
    .min(20, "Ətraflı məlumat çox qısadır")
    .max(1000, "Ətraflı məlumat çox uzundur")
    .required("Ətraflı məlumat mütləqdir"),

  experienceYears: yup
    .string()
    .min(0, "Minimum 0 ola bilər")
    .max(70, "Maksimum 70 ola bilər")
    .required("Təcrübə ili mütləqdir"),

  city: yup.string().trim().required("Şəhər seçilməlidir"),
});

export type MechanicFormSchemaType = yup.InferType<typeof mechanicFormSchema>;
