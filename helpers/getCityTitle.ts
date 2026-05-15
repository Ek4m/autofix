import cityList from "@/data/cities.json";

export const getCityTitle = (id?: number | string) => {
  if (!id) return "-";
  return cityList.find((c) => String(c.id) === String(id))?.name || "-";
};
