import { useContext, useState } from "react";
import { ServicesSearchContext } from "../../contexts/servicesSearch";
import { useTranslations } from "next-intl";
import CategoriesList from "@/components/ui/categoriesList";
import { Grid } from "@mui/material";
import { useDebounce } from "@/modules/common/hooks/useDebounce";
import { HiOutlineSearch } from "react-icons/hi";
import TextField from "@/components/ui/textField";

const ServicesSearch = () => {
  const { category, setCategory, setSearch } = useContext(
    ServicesSearchContext,
  );
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
        <Grid size={{ xs: 12 }}>
          <TextField
            value={localSearch}
            slotProps={{
              input: {
                startAdornment: <HiOutlineSearch size={20} />,
              },
            }}
            onChange={setLocalSearch}
            placeholder={tFeed("search")}
            className="input-field pl-9 pr-9"
          />
        </Grid>
      </Grid>
      <CategoriesList category={category} onCategorySelect={setCategory} />
    </div>
  );
};

export default ServicesSearch;
