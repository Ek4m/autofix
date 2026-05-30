"use client";

import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiMessageSquare,
  FiPlus,
  FiStar,
  FiTool,
  FiTrendingUp,
} from "react-icons/fi";

import { makeImagePath } from "@/helpers/fileOps";
import { useAuth } from "@/modules/auth/contexts";
import SubmitButton from "@/components/ui/submitButton";
import { useState } from "react";
import { PostServiceModal } from "@/modules/services/components/post";
import { useGetMechanicPanelInfo } from "@/modules/profile/hooks/useGetMechanicPanelInfo";
import { getCategoryTitle } from "@/helpers/getCategoryTitle";
import { OFFER_STATUS_CONFIG } from "@/modules/problems/constants";
import { IoIosSettings } from "react-icons/io";

export default function MechanicDashboardPage() {
  const { user } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);

  const { data, isFetching } = useGetMechanicPanelInfo();

  const stats = [
    {
      title: "Aktiv xidmətlər",
      value: data?.servicesCount,
      icon: <FiTool size={22} />,
      color: "#2563eb",
    },
    {
      title: "Göndərilən təkliflər",
      value: data?.offerCounts.allOffersCount,
      icon: <FiMessageSquare size={22} />,
      color: "#7c3aed",
    },
    {
      title: "Qəbul edilən təkliflər",
      value: data?.offerCounts.acceptedOfferCount,
      icon: <FiCheckCircle size={22} />,
      color: "#16a34a",
    },
    {
      title: "Ortalama reytinq",
      value: data?.rating.avgRating,
      icon: <FiStar size={22} />,
      color: "#f59e0b",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {isFetching ? (
        <Box
          sx={{
            mt: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
                  md: 5,
                },
                borderRadius: "32px",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  lg: "row",
                }}
                spacing={4}
                sx={{
                  alignItems: {
                    lg: "center",
                  },
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={makeImagePath(user?.profilePicture)}
                    sx={{
                      width: 72,
                      height: 72,
                      fontSize: 28,
                      fontWeight: 700,
                    }}
                  >
                    ES
                  </Avatar>

                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                      }}
                    >
                      {user?.fullName}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                      Paneldən işlərinizi, təkliflərinizi və xidmətlərinizi
                      idarə edə bilərsiniz.
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  <SubmitButton
                    onClick={() => setShowPostModal(true)}
                    variant="contained"
                    startIcon={<FiPlus />}
                    title="Yeni xidmət"
                  />
                  <SubmitButton
                    component={Link}
                    href="/profile/mechanic/offers"
                    variant="outlined"
                    startIcon={<FiBriefcase />}
                    title="Təkliflərim"
                  />
                </Stack>
              </Stack>
            </Paper>

            {/* STATS */}
            <Grid container spacing={3}>
              {stats.map((item) => (
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
                      height: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
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

            <Grid container spacing={3}>
              {/* ACTIVE JOBS */}
              <Grid
                size={{
                  xs: 12,
                  lg: 7,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "28px",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        Aktiv xidmətlər
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Hal-hazırda paylaşdığınız xidmətlər
                      </Typography>
                    </Box>

                    <Button
                      component={Link}
                      href="/profile/mechanic/services"
                      endIcon={<FiArrowRight />}
                      color="warning"
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      Hamısına bax
                    </Button>
                  </Stack>

                  <Stack spacing={2}>
                    {data?.services.map((job) => (
                      <Paper
                        component={Link}
                        href={`/mechanic-services/${job.id}`}
                        key={job.id}
                        elevation={0}
                        sx={{
                          p: 2.5,
                          transition: "0.2s ease 0s",
                          "&:hover": {
                            bgcolor: "rgba(236, 236, 236, 0.29)",
                          },
                          borderRadius: "20px",
                          bgcolor: "background.default",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Stack spacing={2}>
                          <Stack
                            direction={{
                              xs: "column",
                              sm: "row",
                            }}
                            spacing={2}
                            sx={{
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                }}
                              >
                                {job.serviceName}
                              </Typography>
                              <Typography sx={{ fontWeight: "lighter" }}>
                                {job.description.slice(0, 50) + "..."}
                              </Typography>
                            </Box>
                            <IoIosSettings size={30} color="orangered" />
                          </Stack>
                          <Stack
                            direction={"row"}
                            sx={{ flexWrap: "wrap", gap: 1 }}
                          >
                            {job.categories.map((c) => (
                              <Typography
                                sx={{ fontSize: 12, color: "orange" }}
                                key={c}
                              >
                                #{getCategoryTitle(c)}
                                {"\n"}
                              </Typography>
                            ))}
                          </Stack>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Grid>

              {/* RIGHT */}
              <Grid
                size={{
                  xs: 12,
                  lg: 5,
                }}
              >
                <Stack spacing={3}>
                  {/* OFFERS */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "28px",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          Son təkliflər
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Göndərdiyiniz təkliflər
                        </Typography>
                      </Box>

                      <FiClock size={20} />
                    </Stack>

                    <Stack spacing={2}>
                      {data?.offers.map((offer) => (
                        <Box key={offer.id}>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 700,
                                }}
                              >
                                {offer.description}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {offer.minPrice} - {offer.maxPrice} AZN
                              </Typography>
                            </Box>

                            <Chip
                              label={OFFER_STATUS_CONFIG[offer.status].labelKey}
                              color={OFFER_STATUS_CONFIG[offer.status].color}
                              size="medium"
                              variant="outlined"
                            />
                          </Stack>

                          <Divider
                            sx={{
                              mt: 2,
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  {/* QUICK ACTIONS */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "28px",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                      }}
                    >
                      Sürətli əməliyyatlar
                    </Typography>

                    <Stack spacing={2}>
                      {[
                        {
                          title: "Profilə bax",
                          icon: <FiEye />,
                          href: "/profile",
                        },
                        {
                          title: "Xidmətlərimi idarə et",
                          icon: <FiTool />,
                          href: "/profile/mechanic/services",
                        },
                        {
                          title: "Rəylər və reytinqlər",
                          icon: <FiTrendingUp />,
                          href: "/profile/mechanic/reviews",
                        },
                      ].map((item) => (
                        <SubmitButton
                          key={item.title}
                          component={Link}
                          href={item.href}
                          variant="outlined"
                          color="info"
                          startIcon={item.icon}
                          title={item.title}
                        />
                      ))}
                    </Stack>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      )}

      {showPostModal && (
        <PostServiceModal onClose={() => setShowPostModal(false)} />
      )}
    </Box>
  );
}
