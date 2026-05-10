import * as yup from "yup";

export const postServiceSchema = yup.object({
  serviceName: yup
    .string()
    .required("Xidmət adı mütləqdir")
    .min(3, "Xidmət adı minimum 3 simvol olmalıdır")
    .max(100, "Xidmət adı maksimum 100 simvol ola bilər"),

  category: yup.string().required("Kateqoriya seçilməlidir"),

  description: yup
    .string()
    .required("Təsvir mütləqdir")
    .min(10, "Təsvir minimum 10 simvol olmalıdır")
    .max(1000, "Təsvir maksimum 1000 simvol ola bilər"),

  priceMin: yup.string().required("Minimum qiymət mütləqdir"),

  priceMax: yup
    .string()
    .required("Maksimum qiymət mütləqdir")
    .test(
      "max-greater-than-min",
      "Maksimum qiymət minimum qiymətdən böyük olmalıdır",
      function (value) {
        const { priceMin } = this.parent;

        if (!priceMin || !value) return true;

        return Number(value) >= Number(priceMin);
      },
    ),

  isPremium: yup.boolean(),
});
