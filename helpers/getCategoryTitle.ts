import categoryList from "@/data/categories.json";

const categories = categoryList.flatMap((cat) => cat.subcategories);

export const getCategoryTitle = (id: number | string) => {
  return categories.find((c) => String(c.id) === String(id))?.name || "-";
};
