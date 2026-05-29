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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AutoFixHub — Connect Car Owners with Trusted Mechanics",
  description:
    "AutoFixHub helps car owners in Azerbaijan post repair problems and receive offers from verified local mechanics — fast, transparent, and affordable.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
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
