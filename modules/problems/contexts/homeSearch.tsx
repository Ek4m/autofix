"use client";
import { createContext, FC, PropsWithChildren, useState } from "react";
import { ORDER_BY_CREATION } from "../constants";

export const HomeSearchContext = createContext<{
  category?: number;
  setCategory(val: number): void;
  search: string;
  isVip: boolean;
  setIsVip(val: boolean): void;
  setSearch(val: string): void;
  orderBy: ORDER_BY_CREATION;
  setOrderBy(val: ORDER_BY_CREATION): void;
}>({
  setCategory() {},
  search: "",
  setSearch() {},
  isVip: false,
  setIsVip() {},
  orderBy: ORDER_BY_CREATION.DESC,
  setOrderBy() {},
});

export const HomeSearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState(ORDER_BY_CREATION.DESC);
  const [isVip, setIsVip] = useState(false);
  return (
    <HomeSearchContext.Provider
      value={{
        category,
        setCategory,
        search,
        setSearch,
        isVip,
        setIsVip,
        orderBy,
        setOrderBy,
      }}
    >
      {children}
    </HomeSearchContext.Provider>
  );
};
