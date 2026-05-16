import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { HiOutlineClock } from "react-icons/hi";
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
  HiXMark,
} from "react-icons/hi2";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import AppImage from "@/components/ui/AppImage";
import { useAuth } from "@/modules/auth/contexts";
import { UserProblem } from "../types/interfaces";
import { makeImagePath } from "@/helpers/fileOps";
import { timeAgoAze } from "@/helpers/timeAgoAze";
import { useGetProblemDetails } from "../hooks/useGetProblemDetails";
import OfferListItem from "./offerListItem";
import { IUpload } from "@/modules/upload/types";
import { EntityType } from "@/constants/enums";
import { getCityTitle } from "@/helpers/getCityTitle";
import SubmitButton from "@/components/ui/submitButton";
import { PROBLEM_STATUS, PROBLEM_STATUS_CONFIG } from "../constants";
import AppModal from "@/components/ui/modal";
import { cancelProblem, completeProblem } from "@/modules/profile/services";
import { toast } from "sonner";

export function OffersModal({
  problem,
  onClose,
  onMakeOffer,
  showUserSpecificItems = false,
}: {
  problem: UserProblem;
  onClose: () => void;
  onMakeOffer: (p: UserProblem) => void;
  showUserSpecificItems?: boolean;
}) {
  const [modalOptionsType, setIsDeleteModalOpen] = useState<
    "delete" | "complete" | null
  >(null);
  const { user, isMechanic } = useAuth();
  const tFeed = useTranslations("feed");
  const [activeImg, setActiveImg] = useState(0);
  const isMyPost = user?.id === problem.user.id;

  const { data, refetch, isFetching } = useGetProblemDetails(problem.id);
  const { images, offers } = data ? data : { images: null, offers: null };

  const onCloseDeleteModal = () => setIsDeleteModalOpen(null);
  const status = PROBLEM_STATUS_CONFIG[problem.status];

  const imagesWithThumbnail = useMemo<IUpload[]>(() => {
    if (!images) return [];
    return [
      {
        createdAt: problem.createdAt,
        id: Number.MIN_SAFE_INTEGER,
        entityId: problem.id,
        name: problem.thumbnail,
        type: EntityType.PROBLEM,
        updatedAt: problem.createdAt,
      },
      ...images,
    ];
  }, [images, problem]);

  const onCancel = useMutation({
    mutationFn: async () => {
      await cancelProblem(problem.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const onComplete = useMutation({
    mutationFn: async () => {
      await completeProblem(problem.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <div>
            <Typography variant="h5">{problem.title}</Typography>
            <p className="text-xs text-brand-muted-fg font-mono mt-0.5">
              {problem.carMake} {problem.carModel} · {problem.carYear} ·{" "}
              {getCityTitle(problem.city)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-brand-muted transition-colors ml-3 shrink-0"
          >
            <HiXMark size={18} className="text-brand-muted-fg" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {imagesWithThumbnail.length > 0 && (
            <div className="px-5 pt-4">
              <div className="relative h-[300px] rounded-xl overflow-hidden bg-brand-muted">
                <AppImage
                  key={activeImg}
                  src={makeImagePath(imagesWithThumbnail[activeImg].name)}
                  alt={`${problem.carMake} ${problem.carModel} şəkli ${activeImg + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
              {imagesWithThumbnail.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {imagesWithThumbnail.map((photo, i) => (
                    <button
                      key={`modal-thumb-${problem.id}-${i}`}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-primary-DEFAULT" : "border-transparent"}`}
                    >
                      <AppImage
                        src={makeImagePath(photo.name)}
                        alt={`Kiçik şəkil ${i + 1}`}
                        width={56}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="px-5 py-4">
            {status && (
              <Typography
                variant="caption"
                className={status?.color}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  width: "max-content",
                  gap: 1,
                  mb: 2,
                }}
              >
                {status?.icon}
                {status?.labelKey}
              </Typography>
            )}

            <p className="text-sm text-brand-fg leading-relaxed">
              {problem.description}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-brand-muted-fg">
              <span className="flex items-center gap-1">
                <HiOutlineClock size={11} /> {timeAgoAze(problem.createdAt)}{" "}
                əvvəl
              </span>

              <span className="flex items-center gap-1">
                <HiOutlineMapPin size={11} /> {getCityTitle(problem.city)}
              </span>
              {problem.isVip && (
                <span className="badge-premium">
                  ⭐ {tFeed("premium_badge")}
                </span>
              )}
            </div>
          </div>
          {showUserSpecificItems && !isFetching && data && (
            <Stack
              sx={{
                width: { xs: "100%", md: "60%" },
                p: 2.5,
                flexDirection: { xs: "column", md: "row", gap: 10 },
                justifyContent: {
                  xs: "flex-start",
                  md: "flex-end",
                },
              }}
            >
              {[PROBLEM_STATUS.ASSIGNED, PROBLEM_STATUS.OPEN].includes(
                problem.status,
              ) && (
                <SubmitButton
                  onClick={() => setIsDeleteModalOpen("delete")}
                  color="error"
                  startIcon={<FiTrash />}
                  variant="outlined"
                  title="Ləğv et"
                />
              )}
              {[PROBLEM_STATUS.ASSIGNED].includes(problem.status) && (
                <SubmitButton
                  onClick={() => setIsDeleteModalOpen("complete")}
                  startIcon={<FiCheckCircle />}
                  variant="contained"
                  color="success"
                  title="Problemi bağla"
                />
              )}
            </Stack>
          )}
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-brand-fg">
                Mexanik Təklifləri
                <span className="ml-2 text-primary-DEFAULT font-mono tabular-nums">
                  ({offers?.length})
                </span>
              </h3>
            </div>
            {!offers && isFetching && (
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <CircularProgress />
              </Box>
            )}
            {offers?.length === 0 ? (
              <div className="text-center py-8 text-brand-muted-fg">
                <HiOutlineChatBubbleLeftRight
                  size={32}
                  className="mx-auto mb-2 opacity-30"
                />
                <p className="text-sm">{tFeed("no_offers")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {offers?.map((offer) => (
                  <OfferListItem
                    onRefetch={refetch}
                    offer={offer}
                    showUserSpecificItems={showUserSpecificItems}
                    problem={problem}
                    key={offer.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {!isMyPost && isMechanic && (
          <div className="px-5 py-4 border-t border-brand-border shrink-0">
            <button
              onClick={() => onMakeOffer(problem)}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              <HiOutlineBolt size={15} /> {tFeed("make_offer")}
            </button>
          </div>
        )}
      </div>
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
    </div>
  );
}
