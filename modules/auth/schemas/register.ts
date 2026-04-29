import * as yup from "yup";

export const createRegisterSchema = (requireMechanic: boolean) => {
  return yup.object({
    fullName: yup
      .string()
      .required("Ad və soyad tələb olunur")
      .min(3, "Ad və soyad çox qısadır"),

    email: yup
      .string()
      .email("Email düzgün deyil")
      .required("Email tələb olunur"),

    password: yup
      .string()
      .required("Şifrə tələb olunur")
      .min(6, "Şifrə ən azı 6 simvol olmalıdır"),

    passwordConfirm: yup
      .string()
      .required("Şifrəni təsdiqləyin")
      .oneOf([yup.ref("password")], "Şifrələr uyğun deyil"),

    phoneNumber: yup
      .string()
      .required("Telefon nömrəsi tələb olunur")
      .min(10, "Telefon nömrəsi düzgün deyil"),

    // Use .nullable() and .default(null) to satisfy the RegisterForm interface
    mechanic: requireMechanic
      ? yup
          .object({
            profession: yup
              .array()
              .of(
                yup
                  .mixed<string | number>()
                  .test(
                    "is-valid-type",
                    "Yanlış dəyər",
                    (val) => typeof val === "string" || typeof val === "number",
                  ),
              )
              .min(1, "İxtisas tələb olunur")
              .required("İxtisas tələb olunur"),
            objectName: yup.string().required("Qaraj adı tələb olunur"),
            experienceYears: yup
              .number()
              .typeError("Rəqəm daxil edin")
              .required("Təcrübə ili tələb olunur")
              .min(0, "Düzgün dəyər daxil edin"),
            city: yup.string().required("Şəhər tələb olunur"),
          })
          .required()
      : yup.object().notRequired(),
  });
};
