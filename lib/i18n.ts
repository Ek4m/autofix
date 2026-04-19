export type Locale = "az" | "en" | "ru";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "az", label: "AZ", flag: "🇦🇿" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

export function t(locale: Locale, key: string): string {
  return key;
}
