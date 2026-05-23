"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTool,
  FiXCircle,
} from "react-icons/fi";

import Topbar from "@/components/Topbar";

import MechanicOfferCard from "@/modules/profile/components/offerListItem";
import { useGetMechanicOffers } from "@/modules/profile/hooks/useGetMechanicOffers";
import { cardStyle } from "@/modules/profile/components/styles";
import { OFFER_STATUS } from "@/modules/problems/constants";

export default function MyOffersPage() {
  const [tab, setTab] = useState("");

  const { data: offers, isFetching, refetch } = useGetMechanicOffers();

  const filteredOffers = useMemo(() => {
    if (!offers) {
      return [];
    }

    if (tab === "") {
      return offers;
    }

    return offers.filter((offer) => offer.status === tab);
  }, [offers, tab]);

  const stats = useMemo(() => {
    return {
      total: offers?.length || 0,

      pending:
        offers?.filter((x) => x.status?.toLowerCase() === OFFER_STATUS.PENDING)
          .length || 0,

      accepted:
        offers?.filter((x) => x.status?.toLowerCase() === OFFER_STATUS.ACCEPTED)
          .length || 0,

      rejected:
        offers?.filter((x) => x.status?.toLowerCase() === OFFER_STATUS.DECLINED)
          .length || 0,
    };
  }, [offers]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Topbar />

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <Stack spacing={4}>
          {/* HERO */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
              ...cardStyle,
            }}
          >
            <Stack
              direction={{
                xs: "column",
                lg: "row",
              }}
              spacing={3}
              sx={{
                justifyContent: "space-between",
                alignItems: {
                  lg: "center",
                },
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Təkliflərim
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Göndərdiyiniz bütün təklifləri və onların statuslarını buradan
                  izləyə bilərsiniz.
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* STATS */}
          <Grid container spacing={3}>
            {[
              {
                title: "Bütün təkliflər",
                value: stats.total,
                icon: <FiTool size={22} />,
                color: "#2563eb",
              },
              {
                title: "Gözləmədə",
                value: stats.pending,
                icon: <FiClock size={22} />,
                color: "#f59e0b",
              },
              {
                title: "Qəbul edilib",
                value: stats.accepted,
                icon: <FiCheckCircle size={22} />,
                color: "#16a34a",
              },
              {
                title: "Rədd edilib",
                value: stats.rejected,
                icon: <FiXCircle size={22} />,
                color: "#dc2626",
              },
            ].map((item) => (
              <Grid
                key={item.title}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 3,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "24px",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.title}
                      </Typography>

                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          mt: 1,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* INFO */}
          <Alert severity="warning" icon={<FiAlertCircle />} sx={cardStyle}>
            Qəbul edilən təkliflərdə müştərinin əlaqə məlumatları sizə açıq
            olacaq.
          </Alert>

          {/* FILTERS */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, value) => setTab(value)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={`Hamısı (${stats.total})`} value="" />

              <Tab
                label={`Gözləmədə (${stats.pending})`}
                value={OFFER_STATUS.PENDING}
              />

              <Tab
                label={`Qəbul edilib (${stats.accepted})`}
                value={OFFER_STATUS.ACCEPTED}
              />

              <Tab
                label={`Rədd edilib (${stats.rejected})`}
                value={OFFER_STATUS.DECLINED}
              />
            </Tabs>
          </Paper>

          {/* LIST */}
          <Grid container spacing={3}>
            {filteredOffers.map((offer) => (
              <Grid
                key={offer.id}
                size={{
                  xs: 12,
                }}
              >
                <MechanicOfferCard offer={offer} onRefresh={refetch} />
              </Grid>
            ))}
          </Grid>

          {/* EMPTY */}
          {!isFetching && filteredOffers.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 5,
                  md: 10,
                },
                borderRadius: "32px",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FiTool
                size={54}
                style={{
                  opacity: 0.35,
                  marginBottom: 18,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Təklif tapılmadı
              </Typography>

              <Typography color="text.secondary">
                Seçilmiş filterə uyğun heç bir təklif yoxdur.
              </Typography>

              <Button
                component={Link}
                href="/"
                variant="contained"
                sx={{
                  mt: 3,
                  borderRadius: "12px",
                  textTransform: "none",
                }}
              >
                Problemlərə bax
              </Button>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
