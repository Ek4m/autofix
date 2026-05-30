import type { NextConfig } from "next";
import i18nPlugin from "next-intl/plugin";
const withNextIntl = i18nPlugin("./i18n/request.ts");

const nextConfig: NextConfig = withNextIntl({
  images: {
    qualities: [75, 85],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

export default nextConfig;
