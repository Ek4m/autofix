import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";

import OfferListItem from "@/modules/problems/components/offerListItem";

import { getCityTitle } from "@/helpers/getCityTitle";
import { timeAgoAze } from "@/helpers/timeAgoAze";

import { PROBLEM_STATUS_CONFIG } from "@/modules/problems/constants";
import ProblemGallery from "@/modules/problems/components/gallery";
import {
  getProblemDetailsAction,
  getProblemEntitiesActions,
} from "@/modules/problems/actions";
import ProblemOptions from "@/modules/problems/components/blocks/problemOptions";

export default async function ProblemDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const problem = await getProblemDetailsAction(id);
  console.log(
    "________________________________PROBLEM_____________________________",
    problem,
  );
  const { images, offers } = await getProblemEntitiesActions(id);
  const status = problem ? PROBLEM_STATUS_CONFIG[problem.status] : null;
  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* LEFT */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "28px",
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <ProblemGallery images={images} thumbnail={problem.thumbnail} />
                <Box sx={{ px: 3, pb: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    useFlexGap
                    sx={{
                      mb: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {status && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1.5,
                          py: 0.7,
                          borderRadius: "999px",
                        }}
                        className={status.color}
                      >
                        {status.icon}
                        {status.labelKey}
                      </Typography>
                    )}

                    {problem.isVip && (
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.7,
                          borderRadius: "999px",
                          bgcolor: "warning.light",
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        ⭐ VIP Problem
                      </Typography>
                    )}
                  </Stack>

                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: 40,
                      mb: 1.5,
                    }}
                  >
                    {problem.title}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    useFlexGap
                    sx={{ flexWrap: "wrap" }}
                  >
                    <Stack
                      direction="row"
                      spacing={0.7}
                      sx={{ alignItems: "center" }}
                    >
                      <HiOutlineMapPin size={15} />

                      <Typography variant="body2" color="text.secondary">
                        {getCityTitle(problem.city)}
                      </Typography>
                    </Stack>

                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={0.7}
                    >
                      <HiOutlineClock size={15} />

                      <Typography variant="body2" color="text.secondary">
                        {timeAgoAze(problem.createdAt)} əvvəl
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>

              {/* DESCRIPTION */}
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
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: 25,
                    mb: 2,
                  }}
                >
                  Problem haqqında
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.9,
                    whiteSpace: "pre-line",
                  }}
                >
                  {problem.description}
                </Typography>
              </Paper>

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
                    mb: 3,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: 25,
                      fontWeight: 700,
                    }}
                  >
                    Təkliflər ({offers?.length || 0})
                  </Typography>
                </Stack>

                {offers?.length === 0 ? (
                  <Box
                    sx={{
                      py: 8,
                      textAlign: "center",
                    }}
                  >
                    <HiOutlineChatBubbleLeftRight
                      size={42}
                      style={{
                        opacity: 0.3,
                        marginBottom: 12,
                      }}
                    />

                    <Typography color="text.secondary">
                      Hələ heç bir təklif yoxdur
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {offers?.map((offer) => (
                      <OfferListItem
                        key={offer.id}
                        offer={offer}
                        problem={problem}
                        showUserSpecificItems
                      />
                    ))}
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Grid>

          {/* RIGHT */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Stack
              spacing={3}
              sx={{
                position: {
                  lg: "sticky",
                },
                top: {
                  lg: 90,
                },
              }}
            >
              {/* CAR INFO */}
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
                  Avtomobil məlumatları
                </Typography>

                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography color="text.secondary">Marka</Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                      {problem.brand.name}
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography color="text.secondary">Model</Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                      {problem.model.name}
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography color="text.secondary">İl</Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                      {problem.carYear}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
              <ProblemOptions problem={problem} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const problem = await getProblemDetailsAction(id);
  return {
    title: `${problem.title} | AvtoFix`,
    description: problem.description,
  };
};
