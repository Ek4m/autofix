import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import azMessages from "../messages/az.json";
import enMessages from "../messages/en.json";
import ruMessages from "../messages/ru.json";

export type Locale = "az" | "en" | "ru";
export const locales: Locale[] = ["az", "en", "ru"];
export const defaultLocale: Locale = "az";

const messageMap: Record<Locale, Record<string, unknown>> = {
  az: azMessages,
  en: enMessages,
  ru: ruMessages,
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value as Locale | undefined;
  const locale: Locale = locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : defaultLocale;

  return {
    locale,
    messages: messageMap[locale],
  };
});
