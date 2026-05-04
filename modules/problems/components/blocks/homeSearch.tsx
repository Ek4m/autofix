import { useTranslations } from "next-intl";
import React, { FC, useContext, useMemo, useState } from "react";
import {
  HiCheckCircle,
  HiChevronDown,
  HiOutlineSearch,
  HiStar,
} from "react-icons/hi";
import { HiArrowsUpDown, HiOutlineXMark } from "react-icons/hi2";
import categoryList from "@/data/categories.json";
import { Typography } from "@mui/material";
import { HomeSearchContext } from "../../contexts/homeSearch";
import { PAGE_FILTERS } from "../../constants";

const HomeSearch: FC<{
  premiumOnly: boolean;
  setPremiumOnly(val: boolean): void;
}> = ({ premiumOnly, setPremiumOnly }) => {
  const { category, search, setCategory, setSearch } =
    useContext(HomeSearchContext);
  const [sortOpen, setSortOpen] = useState(false);
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const tFeed = useTranslations("feed");

  const childCategories = useMemo(() => {
    if (!parentCategory) return null;
    const selectedParent = categoryList.find(
      (c) => c.id === Number(parentCategory),
    );
    return selectedParent?.subcategories;
  }, [parentCategory]);

  return (
    <div className="card-surface p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 min-w-0">
          <HiOutlineSearch
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted-fg"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tFeed("search")}
            className="input-field pl-9 pr-9"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted-fg hover:text-brand-fg transition-colors"
            >
              <HiOutlineXMark size={15} />
            </button>
          )}
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-brand-border bg-white text-sm font-medium text-brand-fg hover:bg-brand-muted transition-all duration-150"
          >
            <HiArrowsUpDown size={14} className="text-brand-muted-fg" />

            {sortBy === PAGE_FILTERS.NEWEST ? "Ən yeni" : "Ən köhnə"}

            <HiChevronDown
              size={13}
              className={`text-brand-muted-fg transition-transform duration-150 ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-white border border-brand-border rounded-xl shadow-card py-1 min-w-[180px] z-20 animate-fade-in">
              <button
                onClick={() => {
                  setSortBy(PAGE_FILTERS.NEWEST);
                  setSortOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-brand-muted ${
                  sortBy === PAGE_FILTERS.NEWEST
                    ? "font-semibold text-primary-DEFAULT"
                    : "text-brand-fg"
                }`}
              >
                Ən yeni
                {sortBy === PAGE_FILTERS.NEWEST && (
                  <HiCheckCircle size={14} className="text-primary" />
                )}
              </button>
              <button
                onClick={() => {
                  setSortBy(PAGE_FILTERS.OLDEST);
                  setSortOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-brand-muted ${
                  sortBy === PAGE_FILTERS.OLDEST
                    ? "font-semibold text-primary-DEFAULT"
                    : "text-brand-fg"
                }`}
              >
                Ən köhnə
                {sortBy === PAGE_FILTERS.OLDEST && (
                  <HiCheckCircle size={14} className="text-primary" />
                )}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setPremiumOnly(!premiumOnly)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 shrink-0 ${
            premiumOnly
              ? "bg-amber-50 border-amber-300 text-amber-700"
              : "bg-white border-brand-border text-brand-muted-fg hover:border-amber-300 hover:text-amber-700"
          }`}
        >
          <HiStar size={14} />
          {tFeed("filter.premium")}
        </button>
      </div>
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
