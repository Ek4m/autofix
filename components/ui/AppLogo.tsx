"use client";

import React, { memo, useMemo } from "react";
import AppImage from "./AppImage";

interface AppLogoProps {
  src?: string; // Image source (optional)
  size?: number; // Size for icon/image
  className?: string; // Additional classes
  onClick?: () => void; // Click handler
  alt?: string; // Alt text for image
}

const AppLogo = memo(function AppLogo({
  src = "/images/app_logo.png",
  size = 64,
  className = "",
  onClick,
  alt = "SparklesIcon",
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ["flex items-center"];
    if (onClick)
      classes.push("cursor-pointer hover:opacity-80 transition-opacity");
    if (className) classes.push(className);
    return classes.join(" ");
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      <AppImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="flex-shrink-0"
        priority={true}
        unoptimized={src.endsWith(".svg")}
      />
    </div>
  );
});

export default AppLogo;
