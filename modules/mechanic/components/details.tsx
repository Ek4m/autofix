"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { FaAward, FaWrench } from "react-icons/fa";

import { useGetMechanicInfo } from "../hooks/useGetMechanicInfo";
import { useGetServices } from "@/modules/services/hooks/useGetServices";

import categoriesList from "@/data/categories.json";
import ServiceCard from "@/modules/services/components/card";
import { makeImagePath } from "@/helpers/fileOps";
import { useAuth } from "@/modules/auth/contexts";
import ContactModal from "./contactModal";
import { getCityTitle } from "@/helpers/getCityTitle";
import { ImLocation } from "react-icons/im";
import { cardStyle } from "@/modules/profile/components/styles";
import UserRating from "./mechanicRating";

const MechanicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetMechanicInfo(id);
  const { user } = useAuth();

  const { data: services, isFetching } = useGetServices({
    mechanic: id,
  });

  const categories = useMemo(() => {
    const flat = categoriesList.flatMap((cat) =>
      cat.subcategories.map((c) => ({
        ...c,
        name: `${cat.name} / ${c.name}`,
      })),
    );

    return flat.filter((c) => data?.specialistInfo?.profession.includes(c.id));
  }, [data]);

  const stats = [
    {
      label: "Təcrübə",
      value: `${data?.specialistInfo?.experienceYears || 0} il`,
      Icon: FaAward,
    },
    {
      label: "Xidmətlər",
      value: services?.length || 0,
      Icon: FaWrench,
    },
    {
      label: "Şəhər",
      value: getCityTitle(data?.specialistInfo?.city),
      Icon: ImLocation,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: 4,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Usta Profili
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
        {/* LEFT SIDEBAR */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: 100,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...cardStyle,
              }}
            >
              <Avatar
                src={makeImagePath(data?.profilePicture)}
                sx={{ width: 120, height: 120, mb: 2 }}
              >
                {data?.specialistInfo?.objectName
                  .split(" ")
                  .map((c) => c[0].toUpperCase())
                  .join("")}
              </Avatar>
              {/* HEADER */}
              <UserRating
                rating={data?.rating.avgRating}
                reviewsCount={data?.rating.reviewsCount}
              />
              <Box sx={{ my: 2 }}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: 18, textAlign: "center" }}
                >
                  {data?.fullName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {data?.specialistInfo?.objectName}
                </Typography>
              </Box>

              {/* STATS */}
              <Grid container spacing={2}>
                {stats.map((stat) => (
                  <Grid size={12} key={stat.label}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "background.default",
                        cursor: "default",
                        transition: "0.2s",
                      }}
                    >
                      <stat.Icon size={18} />

                      <Typography
                        sx={{
                          mt: 1,
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {stat.value}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
                <Grid size={12}>{user && <ContactModal id={user.id} />}</Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* BIO */}
            {user && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  ...cardStyle,
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Ətraflı</Typography>

                <Typography variant="body2">
                  {data?.specialistInfo?.bio}
                </Typography>
              </Paper>
            )}

            {/* SPECIALTIES */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                ...cardStyle,
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 2 }}>
                İxtisaslar
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {categories.map((spec) => (
                  <Box
                    key={spec.id}
                    sx={{
                      px: 2,
                      py: 0.6,
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 500,
                      border: "1px solid",
                    }}
                  >
                    {spec.name}
                  </Box>
                ))}
              </Box>
            </Paper>

            <Divider />

            {/* SERVICES */}
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              Xidmətlər
            </Typography>

            {services && services.length === 0 && !isFetching && (
              <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
                <FaWrench size={40} style={{ opacity: 0.4 }} />

                <Typography sx={{ mt: 2, fontWeight: 600 }}>
                  Heç bir xidmət tapılmadı
                </Typography>
              </Paper>
            )}

            <Grid container spacing={3}>
              {isFetching &&
                [1, 2, 3].map((i) => (
                  <Grid size={{ xs: 12, md: 6 }} key={i}>
                    <Skeleton
                      variant="rectangular"
                      height={300}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                ))}

              {services?.map((service) => (
                <Grid size={{ xs: 12, md: 6 }} key={service.id}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MechanicDetails;
