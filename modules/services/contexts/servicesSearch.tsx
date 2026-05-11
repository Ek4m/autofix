"use client";
import { createContext, FC, PropsWithChildren, useState } from "react";

export const ServicesSearchContext = createContext<{
  category: number | null;
  setCategory(val: number | null): void;
  search: string;
  city: string | null;
  setCity(c: string): void;
  isVip: boolean;
  setIsVip(val: boolean): void;
  setSearch(val: string): void;
}>({
  category: null,
  setCategory() {},
  search: "",
  setSearch() {},
  isVip: false,
  city: null,
  setCity() {},
  setIsVip() {},
});

export const ServicesSearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [category, setCategory] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isVip, setIsVip] = useState(false);
  return (
    <ServicesSearchContext.Provider
      value={{
        category,
        setCategory,
        search,
        setSearch,
        isVip,
        setIsVip,
        city,
        setCity,
      }}
    >
      {children}
    </ServicesSearchContext.Provider>
  );
};
