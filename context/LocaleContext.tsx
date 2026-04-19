"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useTransition,
} from "react";

export type Locale = "az" | "en" | "ru";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "az", label: "AZ", flag: "🇦🇿" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "az",
  setLocale: () => {},
});

export function LocaleProvider({
  children,
  initialLocale = "az",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [, startTransition] = useTransition();

  const setLocale = (newLocale: Locale) => {
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    startTransition(() => {
      setLocaleState(newLocale);
      window.location.reload();
    });
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
