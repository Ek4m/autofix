"use client";

import Link from "next/link";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiMapPin,
  FiTool,
  FiTrash,
  FiXCircle,
} from "react-icons/fi";

import { formatPhone } from "@/helpers/formatPhone";
import { MechanicPanelOffer } from "../types/interfaces";
import { OFFER_STATUS, PROBLEM_STATUS } from "@/modules/problems/constants";
import SubmitButton from "@/components/ui/submitButton";
import { getCityTitle } from "@/helpers/getCityTitle";
import { datePrettify } from "@/helpers/datePrettify";
import AppModal from "@/components/ui/modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cardStyle } from "./styles";
import { deleteOffer } from "../services";
import { toast } from "sonner";

interface Props {
  offer: MechanicPanelOffer;
  onRefresh(): void;
}

const getStatusData = (status: string) => {
  switch (status?.toLowerCase()) {
    case OFFER_STATUS.ACCEPTED:
      return {
        label: "Qəbul edildi",
        color: "success" as const,
        icon: <FiCheckCircle size={14} />,
      };

    case OFFER_STATUS.DECLINED:
      return {
        label: "Rədd edildi",
        color: "error" as const,
        icon: <FiXCircle size={14} />,
      };

    default:
      return {
        label: "Gözləmədə",
        color: "warning" as const,
        icon: <FiClock size={14} />,
      };
  }
};

const getPriceText = (min?: number, max?: number) => {
  if (!min && !max) {
    return "Razılaşma yolu ilə";
  }

  if (min && max) {
    return `${min} ₼ - ${max} ₼`;
  }

  return `${min || max} ₼`;
};

const getTimeText = (min?: number, max?: number) => {
  if (!min && !max) {
    return "Razılaşma yolu ilə";
  }

  if (min && max) {
    return `${min}-${max} saat`;
  }

  return `${min || max} saat`;
};

export default function MechanicOfferCard({ offer, onRefresh }: Props) {
  const status = getStatusData(offer.status);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const onDeleteService = useMutation({
    mutationFn: async () => {
      const response = await deleteOffer(offer.id);
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      onRefresh();
    },
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        ...cardStyle,
        height: "100%",
        transition: "0.2s",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          borderColor: "orangered",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* TOP */}
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={3}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            src={
              offer.problem?.thumbnail
                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${offer.problem.thumbnail}`
                : undefined
            }
            variant="rounded"
            sx={{
              width: 72,
              height: 72,
              borderRadius: "18px",
            }}
          >
            <FiTool size={24} />
          </Avatar>

          <Box>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Chip
                icon={status.icon}
                label={status.label}
                color={status.color}
                variant="outlined"
                size="medium"
              />

              <Chip label={`#${offer.id}`} variant="outlined" size="small" />
            </Stack>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
                mb: 0.7,
              }}
            >
              {offer.problem?.title}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {offer.problem?.city && (
                <Stack
                  direction="row"
                  spacing={0.7}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <FiMapPin size={14} />

                  <Typography variant="body2" color="text.secondary">
                    {getCityTitle(offer.problem.city)}
                  </Typography>
                </Stack>
              )}

              <Stack
                direction="row"
                spacing={0.7}
                sx={{
                  alignItems: "flex-start",
                }}
              >
                <FiCalendar size={15} />

                <Typography variant="body2" color="text.secondary">
                  {datePrettify(offer.createdAt)}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            minWidth: {
              md: 220,
            },
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Təklif edilən qiymət
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "primary.main",
              }}
            >
              {getPriceText(offer.minPrice, offer.maxPrice)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Təxmini müddət
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
              }}
            >
              {getTimeText(offer.minHours, offer.maxHours)}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider
        sx={{
          my: 2.5,
        }}
      />

      {/* DESCRIPTION */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Təklif açıqlaması
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            whiteSpace: "pre-line",
          }}
        >
          {offer.description}
        </Typography>
      </Box>

      {/* ACCEPTED */}
      {offer.status?.toLowerCase() === "accepted" && (
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "18px",
            bgcolor: "success.light",
            borderColor: "success.main",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              mb: 1,
            }}
          >
            <FiCheckCircle size={18} color="white" />

            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: "white",
              }}
            >
              Təklif qəbul edilib
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: "white",
            }}
          >
            Müştəri sizin təklifinizi qəbul edib. Əlaqə saxlayaraq işi davam
            etdirə bilərsiniz.
          </Typography>

          {offer.user?.phoneNumber && (
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                fontWeight: 700,
                color: "success.dark",
              }}
            >
              {formatPhone(offer.user.phoneNumber)}
            </Typography>
          )}
        </Paper>
      )}

      {/* ACTIONS */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={1.5}
        sx={{
          width: { xs: "100%", sm: "50%" },
          mt: 3,
        }}
      >
        <SubmitButton
          variant="outlined"
          component={Link}
          startIcon={<FiEye />}
          href={`/problems/${offer.problemId}`}
          title="Problemə bax"
        />
        {offer.problem.status === PROBLEM_STATUS.OPEN && (
          <SubmitButton
            color="error"
            variant="contained"
            onClick={() => setDeleteModalOpen(true)}
            startIcon={<FiTrash />}
            title="Sil"
          />
        )}
      </Stack>
      <AppModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"Silmək istədiyinizə əminsiniz?"}
        description={
          "Bu servisi sildikdən sonra bir daha geri qaytara bilməyəcəksiniz"
        }
        buttons={[
          {
            title: "Geri qayıt",
            onClick: handleCloseDeleteModal,
          },
          {
            variant: "contained",
            title: "Sil",
            loading: onDeleteService.isPending,
            onClick: () => onDeleteService.mutate(),
          },
        ]}
      />
    </Paper>
  );
}
