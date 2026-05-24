"use client";

import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { FiMessageSquare, FiStar, FiTrendingUp, FiUser } from "react-icons/fi";

import Topbar from "@/components/Topbar";
import UserRating from "@/modules/mechanic/components/mechanicRating";
import { useGetMechanicReviews } from "@/modules/profile/hooks/useGetMechanicRatings";

export default function MechanicRatingsPage() {
  const { data } = useGetMechanicReviews();
  const averageRating = data
    ? data.reduce((acc, item) => acc + item.rating, 0) / data.length
    : 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
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
          {/* HEADER */}
          <Paper elevation={0} sx={{ p: 3 }}>
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={3}
              sx={{
                justifyContent: "space-between",
                alignItems: {
                  xs: "flex-start",
                  md: "center",
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
                  Reytinqlərim
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Müştərilər tərəfindən verilən qiymətləndirmələr və rəylər.
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: "divider",
                  minWidth: 240,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "16px",
                      bgcolor: "orange",
                      color: "primary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiTrendingUp size={24} />
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Orta reytinq
                    </Typography>

                    <UserRating
                      rating={averageRating}
                      reviewsCount={data?.length}
                      size="medium"
                    />
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Paper>

          {/* LIST */}
          <Grid container spacing={3}>
            {data?.map((review) => (
              <Grid
                key={review.id}
                size={{
                  xs: 12,
                  lg: 6,
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
                  <Stack spacing={3}>
                    {/* TOP */}
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      spacing={2}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                      >
                        <Avatar
                          sx={{
                            width: 52,
                            height: 52,
                          }}
                        >
                          <FiUser />
                        </Avatar>

                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                            }}
                          >
                            {review.reviewer.fullName}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {new Date(review.createdAt).toLocaleDateString(
                              "az-AZ",
                            )}
                          </Typography>
                        </Box>
                      </Stack>

                      <Chip
                        icon={<FiStar />}
                        label={`${review.rating}/5`}
                        color="warning"
                        variant="outlined"
                      />
                    </Stack>

                    {/* RATING */}
                    <Rating
                      value={review.rating}
                      readOnly
                      icon={<FiStar fill="currentColor" />}
                      emptyIcon={<FiStar />}
                    />

                    {/* COMMENT */}
                    {review.comment && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "18px",
                          bgcolor: "action.hover",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.2}
                          sx={{ alignItems: "flex-start" }}
                        >
                          <Box
                            sx={{
                              mt: "2px",
                              color: "text.secondary",
                            }}
                          >
                            <FiMessageSquare size={18} />
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              lineHeight: 1.8,
                            }}
                          >
                            {review.comment}
                          </Typography>
                        </Stack>
                      </Paper>
                    )}

                    <Divider />

                    {/* PROBLEM */}
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Qiymətləndirilən problem
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          mt: 0.5,
                        }}
                      >
                        {review.problem.title}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* EMPTY */}
          {data?.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 10,
                borderRadius: "28px",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <FiStar
                size={52}
                style={{
                  opacity: 0.3,
                  marginBottom: 16,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Hələ reytinq yoxdur
              </Typography>

              <Typography color="text.secondary">
                Tamamlanmış işlərdən sonra müştəri rəyləri burada görünəcək.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
