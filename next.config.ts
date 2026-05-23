import type { NextConfig } from "next";
import i18nPlugin from "next-intl/plugin";
const withNextIntl = i18nPlugin("./i18n/request.ts");

const nextConfig: NextConfig = withNextIntl({
  redirects: () => [
    {
      source: "/",
      destination: "/problem-feed",
      permanent: false,
    },
  ],
  images: {
    qualities: [75, 85],
  },
});

export default nextConfig;
