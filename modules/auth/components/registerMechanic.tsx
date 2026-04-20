import { useTranslations } from "next-intl";
import React, { FC } from "react";
import cityList from "@/data/cities.json";
import { RegisterForm } from "../types/dtos";
import { Control, Controller } from "react-hook-form";
import TextField from "@/components/ui/textField";
import SelectField from "@/components/ui/selectField";

const RegisterMechanic: FC<{
  control: Control<RegisterForm, object, RegisterForm>;
}> = ({ control }) => {
  const tAuth = useTranslations("auth");

  const SPECIALIZATIONS = [
    "Mühərrik",
    "Elektrik",
    "Əyləc sistemi",
    "Asqı sistemi",
    "Sürət qutusu",
    "Kondisioner",
    "Kuzov",
    "Ümumi təmir",
  ];

  return (
    <>
      <Controller
        name="mechanic.garageName"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            hasError={Boolean(fieldState.error)}
            label={"Qarajın adı"}
            helperText={fieldState.error?.message}
            placeholder="Tex avto servis"
          />
        )}
      />
      <Controller
        name={"mechanic.profession"}
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            options={SPECIALIZATIONS.map((v) => ({ label: v, value: v }))}
            hasError={Boolean(fieldState.error)}
            label={tAuth("mechanic.specialization")}
            helperText={fieldState.error?.message}
            placeholder={tAuth("mechanic.specialization")}
          />
        )}
      />
      <Controller
        name={"mechanic.city"}
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            options={cityList.map((c) => ({
              label: c.name,
              value: c.id.toString(),
            }))}
            hasError={Boolean(fieldState.error)}
            label={tAuth("mechanic.city")}
            helperText={fieldState.error?.message}
            placeholder={tAuth("mechanic.city")}
          />
        )}
      />
      <Controller
        name={"mechanic.experienceYears"}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            hasError={Boolean(fieldState.error)}
            label={tAuth("mechanic.experience")}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </>
  );
};

export default RegisterMechanic;
