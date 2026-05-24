"use client";

import { Rating, Stack, Typography } from "@mui/material";

import { FiStar } from "react-icons/fi";

interface Props {
  rating?: number | string | null;
  reviewsCount?: number | string | null;
  size?: "small" | "medium" | "large";
  showCount?: boolean;
}

export default function UserRating({
  rating,
  reviewsCount,
  size = "small",
  showCount = true,
}: Props) {
  const parsedRating = Number(rating || 0);

  const parsedReviewsCount = Number(reviewsCount || 0);

  return (
    <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.7}>
      <Rating
        value={parsedRating}
        precision={0.1}
        readOnly
        size={size}
        icon={<FiStar fill="currentColor" />}
        emptyIcon={<FiStar />}
      />

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {parsedRating.toFixed(1)}
      </Typography>

      {showCount && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            lineHeight: 1,
          }}
        >
          ({parsedReviewsCount} rəy)
        </Typography>
      )}
    </Stack>
  );
}
