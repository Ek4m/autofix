import * as yup from "yup";

export const postProblemSchema = yup.object({
  title: yup
    .string()
    .required("Başlıq mütləqdir")
    .min(5, "Başlıq ən azı 5 simvol olmalıdır"),

  description: yup
    .string()
    .required("Açıqlama mütləqdir")
    .min(10, "Açıqlama ən azı 10 simvol olmalıdır"),

  carMake: yup.string().required("Avtomobil markası mütləqdir"),

  carModel: yup.string().required("Avtomobil modeli mütləqdir"),

  carYear: yup
    .string()
    .required("Avtomobil ili mütləqdir")
    .matches(/^\d{4}$/, "İl 4 rəqəm olmalıdır")
    .test(
      "valid-year-range",
      "İl 1900 ilə cari il arasında olmalıdır",
      (value) => {
        if (!value) return false;
        const year = Number(value);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
      },
    ),
  categoryId: yup.number().required("Kateqoriya mütləqdir"),

  city: yup.string().required("Şəhər mütləqdir"),

  isVip: yup.boolean().required(),

  vipInfo: yup
    .object({
      vipLifeTime: yup.string().when("isVip", {
        is: true,
        then: (schema) => schema.required("VIP müddəti mütləqdir"),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
      minBudget: yup.string().when("isVip", {
        is: true,
        then: (schema) => schema.required("Minimum büdcə mütləqdir"),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
      maxBudget: yup.string().when("isVip", {
        is: true,
        then: (schema) =>
          schema
            .required("Maksimum büdcə mütləqdir")
            .test(
              "is-greater",
              "Maksimum büdcə minimum büdcədən kiçik ola bilməz",
              function (value) {
                const { minBudget } = this.parent;
                if (!value || !minBudget) return true;
                return Number(value) >= Number(minBudget);
              },
            ),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
    })
    .nullable()
    .when("isVip", {
      is: true,
      then: (schema) => schema.required("VIP məlumatları mütləqdir"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
});
