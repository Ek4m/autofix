"use client";
import { useGetMechanics } from "../hooks/useGetMechanics";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const MechanicList = () => {
  const { data, isFetching } = useGetMechanics();

  return (
    <Grid container spacing={3}>
      {isFetching
        ? [1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 4 }}
              />
            </Grid>
          ))
        : data?.map((m) => (
            <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link
                href={`/mechanic-info/${m.id}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* HEADER */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      src={m.profilePicture || undefined}
                      sx={{ width: 56, height: 56 }}
                    >
                      {m.fullName[0]}
                    </Avatar>

                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {m.fullName}
                      </Typography>

                      <Typography
                        sx={{ fontSize: 13, color: "text.secondary" }}
                      >
                        {m.specialistInfo.objectName}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* RATING */}
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2, alignItems: "center" }}
                  >
                    <FaStar color="#f59e0b" />
                    <Typography sx={{ fontWeight: 600 }}>
                      {m.avgRating.toFixed(1)}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                      ({m.reviewsCount} rəy)
                    </Typography>
                  </Stack>

                  {/* INFO */}
                  <Stack spacing={1.5} sx={{ mt: 2 }}>
                    <Chip
                      label={`${m.specialistInfo.experienceYears} il təcrübə`}
                      size="small"
                    />

                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 14,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {m.specialistInfo.bio}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
    </Grid>
  );
};

export default MechanicList;
