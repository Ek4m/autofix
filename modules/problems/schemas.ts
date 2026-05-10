import * as yup from "yup";

export const checkMinusAndZero = (value: string) => {
  const val = Number(value);
  return !isNaN(val) && val > 0;
};

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
  images: yup
    .array()
    .of(yup.mixed<File>())
    .min(1, "Minimum 1 şəkil seçilməlidir"),

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

  minBudget: yup.string().required("Minimum büdcə mütləqdir"),
  maxBudget: yup
    .string()
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
});

export const offerSchema = yup.object({
  description: yup
    .string()
    .required("Təsvir tələb olunur")
    .min(10, "Təsvir ən azı 10 simvol olmalıdır"),

  minHours: yup
    .string()
    .required("Minimum vaxt tələb olunur")
    .test("noninteger", "Düzgün dəyər daxil edilməlidir", checkMinusAndZero),

  maxHours: yup
    .string()
    .required("Maksimum vaxt tələb olunur")
    .test("noninteger", "Düzgün dəyər daxil edilməlidir", checkMinusAndZero)
    .test(
      "max-hours-check",
      "Maksimum vaxt minimumdan kiçik ola bilməz",
      function (value) {
        const { minHours, minHoursUnit, maxHoursUnit } = this.parent;
        const minUnit = Number(minHoursUnit);
        const maxUnit = Number(maxHoursUnit);
        const minH = Number(minHours) | 1;
        const maxH = Number(value) | 1;

        return maxUnit * maxH >= minH * minUnit;
      },
    ),
  minHoursUnit: yup.string().required("Minimum qiymət tələb olunur"),
  maxHoursUnit: yup.string().required("Minimum qiymət tələb olunur"),
  minPrice: yup
    .string()
    .required("Minimum qiymət tələb olunur")
    .test("noninteger", "Düzgün dəyər daxil edilməlidir", checkMinusAndZero),
  maxPrice: yup
    .string()
    .required("Maksimum qiymət tələb olunur")
    .test("noninteger", "Düzgün dəyər daxil edilməlidir", checkMinusAndZero)
    .test(
      "max-price-check",
      "Maksimum qiymət minimumdan kiçik ola bilməz",
      function (value) {
        const { minPrice } = this.parent;
        return Number(value) >= Number(minPrice);
      },
    ),
});
