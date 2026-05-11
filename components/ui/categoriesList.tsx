import React, { FC, useMemo, useState } from "react";
import categoryList from "@/data/categories.json";
import { Typography } from "@mui/material";

const CategoriesList: FC<{
  onCategorySelect: (id: number) => void;
  category: number | null | undefined;
}> = ({ onCategorySelect, category }) => {
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  
  const childCategories = useMemo(() => {
    if (!parentCategory) return null;
    const selectedParent = categoryList.find(
      (c) => c.id === Number(parentCategory),
    );
    return selectedParent?.subcategories;
  }, [parentCategory]);
  return (
    <>
      <Typography sx={{ mt: 2, fontSize: 15 }}>Kategoriya seçin</Typography>
      <div className="flex gap-2 mt-4 flex-wrap pb-1 scrollbar-hide">
        {categoryList.map((cat) => (
          <button
            key={`cat-${cat.id}`}
            onClick={() => setParentCategory(String(cat.id))}
            className={`filter-chip whitespace-nowrap shrink-0 ${
              parentCategory === String(cat.id)
                ? "filter-chip-active"
                : "filter-chip-inactive"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {childCategories && (
        <>
          <Typography sx={{ mt: 2, fontSize: 15 }}>
            Sub-kategoriya seçin
          </Typography>
          <div className="flex gap-2 mt-4 flex-wrap pb-1 scrollbar-hide">
            {childCategories.map((cat) => (
              <button
                key={`cat-${cat.id}`}
                onClick={() => onCategorySelect(cat.id)}
                className={`filter-chip whitespace-nowrap shrink-0 ${
                  category === cat.id
                    ? "filter-chip-active"
                    : "filter-chip-inactive"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesList;
