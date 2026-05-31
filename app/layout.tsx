import React from "react";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { LocaleProvider } from "@/context/LocaleContext";
import type { Locale } from "@/context/LocaleContext";
import { AuthProvider } from "@/modules/auth/contexts";
import "../styles/index.css";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AvtoFix | Avtomobil Təmir Xidmətləri və Usta Tapma Platforması",
  description:
    "Avtomobil probleminizi paylaşın, müxtəlif ustalardan təkliflər alın və ən uyğun həlli seçin. AvtoFix sürücülərlə peşəkar mexanikləri bir araya gətirir.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    title: "AvtoFix - Maşın Problemləri Üçün Etibarlı Usta Tapın",
    description:
      "Probleminizi paylaşın, ustalardan təkliflər alın, reytinqləri müqayisə edin və ən uyğun həlli seçin.",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "AvtoFix",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleProvider initialLocale={locale as Locale}>
            <AuthProvider>
              <Topbar />
              {children}
              <Footer />
            </AuthProvider>
            <Toaster position="bottom-right" richColors />
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
