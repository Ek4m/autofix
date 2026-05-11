import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";
import { HiOutlineSearch, HiStar } from "react-icons/hi";
import { Grid } from "@mui/material";
import { HomeSearchContext } from "../../contexts/homeSearch";
import cityList from "@/data/cities.json";
import { ORDER_BY_CREATION } from "../../constants";
import { useDebounce } from "@/modules/common/hooks/useDebounce";
import SelectField from "@/components/ui/selectField";
import TextField from "@/components/ui/textField";
import SubmitButton from "@/components/ui/submitButton";
import CategoriesList from "@/components/ui/categoriesList";

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
  const [localSearch, setLocalSearch] = useState("");
  const tFeed = useTranslations("feed");

  useDebounce(
    () => {
      setSearch(localSearch);
    },
    [localSearch],
    1500,
  );

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
      <CategoriesList category={category} onCategorySelect={setCategory} />
    </div>
  );
};

export default HomeSearch;
