"use client";

import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiEye,
  FiMessageSquare,
  FiPlus,
  FiStar,
  FiTool,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

import Topbar from "@/components/Topbar";
import { makeImagePath } from "@/helpers/fileOps";
import { useAuth } from "@/modules/auth/contexts";
import SubmitButton from "@/components/ui/submitButton";
import { useState } from "react";
import { PostServiceModal } from "@/modules/services/components/post";

export default function MechanicDashboardPage() {
  const { user } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);

  const stats = [
    {
      title: "Aktiv işlər",
      value: 5,
      icon: <FiTool size={22} />,
      color: "#2563eb",
    },
    {
      title: "Göndərilən təkliflər",
      value: 18,
      icon: <FiMessageSquare size={22} />,
      color: "#7c3aed",
    },
    {
      title: "Tamamlanan işlər",
      value: 42,
      icon: <FiCheckCircle size={22} />,
      color: "#16a34a",
    },
    {
      title: "Ortalama reytinq",
      value: "4.8",
      icon: <FiStar size={22} />,
      color: "#f59e0b",
    },
  ];

  const activeJobs = [
    {
      id: 12,
      title: "Mühərrikdən səs gəlir",
      customer: "Rəşad Məmmədov",
      budget: "120 ₼",
      progress: 65,
    },
    {
      id: 18,
      title: "Kondisioner işləmir",
      customer: "Elvin Həsənov",
      budget: "80 ₼",
      progress: 30,
    },
  ];

  const recentOffers = [
    {
      id: 44,
      title: "Əyləc problemi",
      status: "Gözləmədə",
      price: "150 ₼",
    },
    {
      id: 45,
      title: "Yağ dəyişimi",
      status: "Qəbul edildi",
      price: "40 ₼",
    },
    {
      id: 46,
      title: "Elektrik problemi",
      status: "Rədd edildi",
      price: "220 ₼",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
                    Paneldən işlərinizi, təkliflərinizi və xidmətlərinizi idarə
                    edə bilərsiniz.
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
                  href="/mechanic/offers"
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
                      Aktiv işlər
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Hal-hazırda işlədiyiniz problemlər
                    </Typography>
                  </Box>

                  <Button
                    component={Link}
                    href="/mechanic/jobs"
                    endIcon={<FiArrowRight />}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Hamısına bax
                  </Button>
                </Stack>

                <Stack spacing={2}>
                  {activeJobs.map((job) => (
                    <Paper
                      key={job.id}
                      elevation={0}
                      sx={{
                        p: 2.5,
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
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {job.title}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                alignItems: "center",
                                mt: 0.7,
                              }}
                            >
                              <FiUser size={14} />

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {job.customer}
                              </Typography>
                            </Stack>
                          </Box>

                          <Chip label={job.budget} color="primary" />
                        </Stack>

                        <Box>
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              İşin vəziyyəti
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {job.progress}%
                            </Typography>
                          </Stack>

                          <LinearProgress
                            variant="determinate"
                            value={job.progress}
                            sx={{
                              height: 8,
                              borderRadius: "999px",
                            }}
                          />
                        </Box>
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
                    {recentOffers.map((offer) => (
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
                              {offer.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              {offer.price}
                            </Typography>
                          </Box>

                          <Chip
                            label={offer.status}
                            color={
                              offer.status === "Qəbul edildi"
                                ? "success"
                                : offer.status === "Rədd edildi"
                                  ? "error"
                                  : "warning"
                            }
                            size="small"
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
                        href: "/mechanic/services",
                      },
                      {
                        title: "Rəylər və reytinqlər",
                        icon: <FiTrendingUp />,
                        href: "/mechanic/reviews",
                      },
                      {
                        title: "Qazanc statistikası",
                        icon: <FiDollarSign />,
                        href: "/mechanic/earnings",
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
      {showPostModal && (
        <PostServiceModal onClose={() => setShowPostModal(false)} />
      )}
    </Box>
  );
}
