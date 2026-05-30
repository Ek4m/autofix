"use client";
import { Paper, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { PROBLEM_STATUS } from "../../constants";
import { UserProblem } from "../../types/interfaces";
import SubmitButton from "@/components/ui/submitButton";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelProblem, completeProblem } from "@/modules/profile/services";
import AppModal from "@/components/ui/modal";
import MechanicRatingModal from "../rateMechanic";
import { useAuth } from "@/modules/auth/contexts";
import { cardStyle } from "@/modules/profile/components/styles";
import { HiOutlineBolt } from "react-icons/hi2";
import { OfferSolution } from "../offer";

const ProblemOptions: FC<{ problem: UserProblem }> = ({ problem }) => {
  const [modalType, setModalType] = useState<"delete" | "complete" | null>(
    null,
  );
  const [postOfferOpen, setPostOfferOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const { user, isMechanic } = useAuth();
  const isMyPost = user?.id === problem?.user.id;

  const onCloseModal = () => {
    setModalType(null);
  };

  const onCloseDeleteModal = () => setModalType(null);

  const onCancel = useMutation({
    mutationFn: async () => {
      if (!problem) return;
      await cancelProblem(problem.id);
    },

    onSuccess: () => {
      toast.success("Problem ləğv edildi");
      navigation.reload();
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
      navigation.reload();
      setIsRatingModalOpen(true);
      onCloseModal();
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <>
      {isMyPost && (
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
      )}
      <AppModal
        open={Boolean(modalType)}
        onClose={onCloseDeleteModal}
        title={
          modalType === "complete"
            ? "Problemi bağlamaq istədiyinizə əminsinizmi?"
            : "Problemi ləğv etmək istədiyinizə əminsinizmi?"
        }
        description={
          modalType === "complete"
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
              modalType === "complete"
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
      {postOfferOpen && (
        <OfferSolution
          problem={problem}
          onClose={() => setPostOfferOpen(false)}
        />
      )}
    </>
  );
};

export default ProblemOptions;
