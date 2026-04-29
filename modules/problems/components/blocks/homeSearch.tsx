import { useTranslations } from "next-intl";
import React, { FC, useState } from "react";
import {
  HiCheckCircle,
  HiChevronDown,
  HiOutlineSearch,
  HiStar,
} from "react-icons/hi";
import { HiArrowsUpDown, HiOutlineXMark } from "react-icons/hi2";
import categoryList from "@/data/categories.json";

const SORT_OPTIONS = [
  { key: "newest", labelKey: "newest" },
  { key: "offers", labelKey: "offers" },
  { key: "premium", labelKey: "premium" },
];

const HomeSearch: FC<{
  activeCategory: string;
  premiumOnly: boolean;
  setPremiumOnly(val: boolean): void;
  setActiveCategory(val: string): void;
}> = ({ activeCategory, premiumOnly, setPremiumOnly, setActiveCategory }) => {
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const tFeed = useTranslations("feed");
  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sortBy)?.labelKey ?? "newest";

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

            {tFeed(`sort.${currentSortLabel}`)}

            <HiChevronDown
              size={13}
              className={`text-brand-muted-fg transition-transform duration-150 ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-white border border-brand-border rounded-xl shadow-card py-1 min-w-[180px] z-20 animate-fade-in">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={`sort-${opt.key}`}
                  onClick={() => {
                    setSortBy(opt.key);
                    setSortOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-brand-muted ${
                    sortBy === opt.key
                      ? "font-semibold text-primary-DEFAULT"
                      : "text-brand-fg"
                  }`}
                >
                  {tFeed(`sort.${opt.labelKey}`)}
                  {sortBy === opt.key && (
                    <HiCheckCircle size={14} className="text-primary" />
                  )}
                </button>
              ))}
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

      <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        {categoryList.map((cat) => (
          <button
            key={`cat-${cat.id}`}
            onClick={() => setActiveCategory(String(cat.id))}
            className={`filter-chip whitespace-nowrap shrink-0 ${
              activeCategory === String(cat.id)
                ? "filter-chip-active"
                : "filter-chip-inactive"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeSearch;
