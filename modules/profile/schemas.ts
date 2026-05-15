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
