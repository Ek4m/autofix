import type { NextConfig } from "next";
import i18nPlugin from "next-intl/plugin";
const withNextIntl = i18nPlugin("./i18n/request.ts");

const nextConfig: NextConfig = withNextIntl({
  redirects: () => [
    {
      source: "/",
      destination: "/car-problems-feed",
      permanent: false,
    },
  ],
});

export default nextConfig;
