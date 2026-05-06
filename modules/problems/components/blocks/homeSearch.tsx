import { useTranslations } from "next-intl";
import React, { useContext, useMemo, useState } from "react";
import { HiOutlineSearch, HiStar } from "react-icons/hi";
import categoryList from "@/data/categories.json";
import { Grid, Typography } from "@mui/material";
import { HomeSearchContext } from "../../contexts/homeSearch";
import cityList from "@/data/cities.json";
import { ORDER_BY_CREATION } from "../../constants";
import { useDebounce } from "@/modules/common/hooks/useDebounce";
import SelectField from "@/components/ui/selectField";
import TextField from "@/components/ui/textField";
import SubmitButton from "@/components/ui/submitButton";

const HomeSearch = () => {
  const {
    category,
    setCategory,
    setSearch,
    setIsVip,
    isVip,
    setCity,
    city,
    orderBy,
    setOrderBy,
  } = useContext(HomeSearchContext);
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState("");
  const tFeed = useTranslations("feed");

  useDebounce(
    () => {
      setSearch(localSearch);
    },
    [localSearch],
    1500,
  );

  const childCategories = useMemo(() => {
    if (!parentCategory) return null;
    const selectedParent = categoryList.find(
      (c) => c.id === Number(parentCategory),
    );
    return selectedParent?.subcategories;
  }, [parentCategory]);

  return (
    <div className="card-surface p-4 mb-6">
      <Grid spacing={2} container sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TextField
            value={localSearch}
            slotProps={{
              input: {
                startAdornment: <HiOutlineSearch />,
              },
            }}
            onChange={setLocalSearch}
            placeholder={tFeed("search")}
            className="input-field pl-9 pr-9"
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 2 }}>
          <SelectField
            value={city}
            options={cityList.map((c) => ({
              label: c.name,
              value: c.id.toString(),
            }))}
            label="Şəhər"
            onChange={setCity}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 2 }}>
          <SelectField
            value={orderBy}
            options={[
              { value: ORDER_BY_CREATION.DESC, label: "Ən yeni" },
              { value: ORDER_BY_CREATION.ASC, label: "Ən köhnə" },
            ]}
            placeholder="Sıralama"
            onChange={setOrderBy}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 2 }}>
          <SubmitButton
            onClick={() => setIsVip(!isVip)}
            endIcon={<HiStar size={20} />}
            variant={isVip ? "contained" : "outlined"}
            title={tFeed("filter.premium")}
          />
        </Grid>
      </Grid>
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
                onClick={() => setCategory(cat.id)}
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
    </div>
  );
};

export default HomeSearch;
