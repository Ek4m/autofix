"use client";
import { createContext, FC, PropsWithChildren, useState } from "react";

export const HomeSearchContext = createContext<{
  category?: number;
  setCategory(val: number): void;
  search: string;
  setSearch(val: string): void;
}>({
  setCategory() {},
  search: "",
  setSearch() {},
});

export const HomeSearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState("");
  return (
    <HomeSearchContext.Provider
      value={{ category, setCategory, search, setSearch }}
    >
      {children}
    </HomeSearchContext.Provider>
  );
};
