"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";

import { FiCheckCircle, FiTrash } from "react-icons/fi";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import Topbar from "@/components/Topbar";
import AppImage from "@/components/ui/AppImage";
import SubmitButton from "@/components/ui/submitButton";
import AppModal from "@/components/ui/modal";

import OfferListItem from "@/modules/problems/components/offerListItem";

import { useAuth } from "@/modules/auth/contexts";
import { useGetProblemDetails } from "@/modules/problems/hooks/useGetProblemDetails";

import { cancelProblem, completeProblem } from "@/modules/profile/services";

import { makeImagePath } from "@/helpers/fileOps";
import { getCityTitle } from "@/helpers/getCityTitle";
import { timeAgoAze } from "@/helpers/timeAgoAze";

import {
  PROBLEM_STATUS,
  PROBLEM_STATUS_CONFIG,
} from "@/modules/problems/constants";
import { OfferSolution } from "@/modules/problems/components/offer";
import { cardStyle } from "@/modules/profile/components/styles";
import MechanicRatingModal from "@/modules/problems/components/rateMechanic";

export default function ProblemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [postOfferOpen, setPostOfferOpen] = useState(false);
  const [modalOptionsType, setIsDeleteModalOpen] = useState<
    "delete" | "complete" | null
  >(null);
  const { user, isMechanic } = useAuth();

  const [activeImg, setActiveImg] = useState(0);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "complete" | null>(
    null,
  );

  const { data, isFetching, refetch } = useGetProblemDetails(id);

  const problem = data?.problem;

  const isMyPost = user?.id === problem?.user.id;

  const status = problem ? PROBLEM_STATUS_CONFIG[problem.status] : null;
  const onCloseDeleteModal = () => setIsDeleteModalOpen(null);

  const imagesWithThumbnail = useMemo(() => {
    if (!problem) return [];

    const images = data?.images || [];

    return [
      {
        id: Number.MIN_SAFE_INTEGER,
        name: problem.thumbnail,
      },
      ...images,
    ];
  }, [data?.images, problem]);

  const onCloseModal = () => {
    setModalType(null);
  };

  const onCancel = useMutation({
    mutationFn: async () => {
      if (!problem) return;

      await cancelProblem(problem.id);
    },

    onSuccess: () => {
      toast.success("Problem ləğv edildi");

      refetch();

      onCloseModal();
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const onComplete = useMutation({
    mutationFn: async () => {
      if (!problem) return;
      await completeProblem(problem.id);
    },

    onSuccess: () => {
      toast.success("Problem tamamlandı");
      refetch();
      setIsRatingModalOpen(true);
      onCloseModal();
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  if (isFetching || !problem) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        <Topbar />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

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
        <Grid container spacing={4}>
          {/* LEFT */}
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <Stack spacing={3}>
              {/* HEADER */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "28px",
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                {/* IMAGE */}
                {imagesWithThumbnail.length > 0 && (
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
                        src={makeImagePath(
                          imagesWithThumbnail[activeImg]?.name,
                        )}
                        key={activeImg}
                        alt={problem.title}
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
                                activeImg === index
                                  ? "primary.main"
                                  : "transparent",
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
                )}

                <Box
                  sx={{
                    px: 3,
                    pb: 3,
                  }}
                >
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
                    variant="h4"
                    sx={{
                      fontWeight: 800,
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
                  variant="h6"
                  sx={{
                    fontWeight: 700,
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
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Təkliflər ({data.offers?.length || 0})
                  </Typography>
                </Stack>

                {data.offers?.length === 0 ? (
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
                    {data.offers?.map((offer) => (
                      <OfferListItem
                        key={offer.id}
                        offer={offer}
                        problem={problem}
                        onRefetch={refetch}
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

              {/* ACTIONS */}
              {isMyPost && (
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
                    Əməliyyatlar
                  </Typography>

                  <Stack spacing={2}>
                    {[PROBLEM_STATUS.ASSIGNED, PROBLEM_STATUS.OPEN].includes(
                      problem.status,
                    ) && (
                      <SubmitButton
                        onClick={() => setModalType("delete")}
                        color="error"
                        variant="outlined"
                        startIcon={<FiTrash />}
                        title="Problemi ləğv et"
                      />
                    )}

                    {problem.status === PROBLEM_STATUS.ASSIGNED && (
                      <SubmitButton
                        onClick={() => setModalType("complete")}
                        color="success"
                        variant="contained"
                        startIcon={<FiCheckCircle />}
                        title="Problemi tamamla"
                      />
                    )}
                  </Stack>
                </Paper>
              )}

              {/* MAKE OFFER */}
              {!isMyPost && isMechanic && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    ...cardStyle,
                  }}
                >
                  <SubmitButton
                    startIcon={<HiOutlineBolt />}
                    variant="contained"
                    onClick={() => setPostOfferOpen(true)}
                    title="Təklif göndər"
                    fullWidth
                  />
                </Paper>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <AppModal
        open={Boolean(modalType)}
        onClose={onCloseModal}
        title={
          modalType === "complete"
            ? "Problemi bağlamaq istədiyinizə əminsinizmi?"
            : "Problemi ləğv etmək istədiyinizə əminsinizmi?"
        }
        description={
          modalType === "complete"
            ? "Problemi tamamladıqdan sonra bu iş üzrə proses bağlanmış hesab ediləcək. Bu, usta ilə uğurla əlaqə saxladığınızı və xidmətin tamamlandığını bildirir. Tamamlandıqdan sonra ustanın performansını qiymətləndirməyiniz üçün reytinq pəncərəsi açılacaq."
            : "Bu problemi ləğv etdikdən sonra artıq yeni təklif qəbul edə bilməyəcəksiniz."
        }
        buttons={[
          {
            title: "Geri qayıt",
            onClick: onCloseModal,
          },
          {
            title:
              modalType === "complete"
                ? "Problemi tamamla"
                : "Problemi ləğv et",

            variant: "contained",

            loading: onCancel.isPending || onComplete.isPending,

            onClick: () =>
              modalType === "complete"
                ? onComplete.mutate()
                : onCancel.mutate(),
          },
        ]}
      />
      {postOfferOpen && (
        <OfferSolution
          problem={problem}
          onClose={() => setPostOfferOpen(false)}
        />
      )}
      <AppModal
        open={Boolean(modalOptionsType)}
        onClose={onCloseDeleteModal}
        title={
          modalOptionsType === "complete"
            ? "Problemi bağlamaq istədiyinizə əminsinizmi?"
            : "Problemi ləğv etmək istədiyinizə əminsinizmi?"
        }
        description={
          modalOptionsType === "complete"
            ? "Problemi tamamladıqdan sonra bu iş üzrə proses bağlanmış hesab ediləcək. Bu, usta ilə uğurla əlaqə saxladığınızı və xidmətin tamamlandığını bildirir. Tamamlandıqdan sonra ustanın performansını qiymətləndirməyiniz üçün reytinq pəncərəsi açılacaq."
            : "Bu problemi ləğv etdikdən sonra artıq yeni təklif qəbul edə bilməyəcəksiniz. "
        }
        buttons={[
          {
            title: "Geri qayıt",
            onClick: onCloseDeleteModal,
          },
          {
            title: "Bağla",
            variant: "contained",
            loading: onCancel.isPending || onComplete.isPending,
            onClick: () =>
              modalOptionsType === "complete"
                ? onComplete.mutate()
                : onCancel.mutate(),
          },
        ]}
      />
      <MechanicRatingModal
        problemId={problem.id}
        open={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />
    </Box>
  );
}
