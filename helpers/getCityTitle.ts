import cityList from "@/data/cities.json";

export const getCityTitle = (id: number | string) => {
  return cityList.find((c) => String(c.id) === String(id))?.name || "-";
};
