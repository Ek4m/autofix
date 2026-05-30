"use client";
import AppImage from "@/components/ui/AppImage";
import { makeImagePath } from "@/helpers/fileOps";
import { IUpload } from "@/modules/upload/types";
import { Box, Stack } from "@mui/material";
import { FC, useMemo, useState } from "react";

const ProblemGallery: FC<{ thumbnail: string; images: IUpload[] }> = ({
  images,
  thumbnail,
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const imagesWithThumbnail = useMemo(() => {
    if (!thumbnail) return [];

    return [
      {
        id: Number.MIN_SAFE_INTEGER,
        name: thumbnail,
      },
      ...images,
    ];
  }, [thumbnail, images]);
  return (
    imagesWithThumbnail.length > 0 && (
      <Box
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: {
              xs: 240,
              md: 420,
            },
            borderRadius: "20px",
            overflow: "hidden",
            bgcolor: "action.hover",
          }}
        >
          <AppImage
            fill
            src={makeImagePath(imagesWithThumbnail[activeImg]?.name)}
            key={activeImg}
            alt="Problem Thumbnail"
            className="object-cover"
          />
        </Box>

        {imagesWithThumbnail.length > 1 && (
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              mt: 2,
              overflowX: "auto",
            }}
          >
            {imagesWithThumbnail.map((image, index) => (
              <Box
                key={index}
                onClick={() => setActiveImg(index)}
                sx={{
                  width: 90,
                  height: 70,
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor:
                    activeImg === index ? "primary.main" : "transparent",
                  flexShrink: 0,
                }}
              >
                <AppImage
                  fill
                  src={makeImagePath(image.name)}
                  alt={`problem-image-${index}`}
                  className="object-cover"
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    )
  );
};

export default ProblemGallery;
