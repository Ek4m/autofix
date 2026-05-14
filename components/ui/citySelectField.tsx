import React, { FC } from "react";
import SelectField, { SelectFieldProps } from "./selectField";
import { useTranslations } from "next-intl";
import cityList from "@/data/cities.json";

const CitySelectField: FC<
  Omit<SelectFieldProps, "options" | "label" | "placeholder">
> = (props) => {
  const tAuth = useTranslations("auth");

  return (
    <SelectField
      {...props}
      options={cityList.map((c) => ({
        label: c.name,
        value: c.id.toString(),
      }))}
      placeholder={tAuth("mechanic.city")}
      label={tAuth("mechanic.city")}
    />
  );
};

export default CitySelectField;
