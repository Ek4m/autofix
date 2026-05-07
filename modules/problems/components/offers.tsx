import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { HiOutlineClock } from "react-icons/hi";
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
  HiXMark,
} from "react-icons/hi2";

import AppImage from "@/components/ui/AppImage";
import { useAuth } from "@/modules/auth/contexts";
import citiesList from "@/data/cities.json";
import { UserProblem } from "../types/interfaces";
import { makeImagePath } from "@/helpers/makeImagePath";
import { timeAgoAze } from "@/helpers/timeAgoAze";
import { useGetProblemDetails } from "../hooks/useGetProblemDetails";
import OfferListItem from "./offerListItem";
import { Typography } from "@mui/material";
import { IUpload } from "@/modules/upload/types";
import { UploadedFileType } from "@/constants/enums";

export function OffersModal({
  problem,
  onClose,
  onMakeOffer,
}: {
  problem: UserProblem;
  onClose: () => void;
  onMakeOffer: (p: UserProblem) => void;
}) {
  const { user } = useAuth();
  const tFeed = useTranslations("feed");
  const [activeImg, setActiveImg] = useState(0);
  const isMyPost = user?.id === problem.user.id;

  const {
    data: { images, offers },
    refetch,
  } = useGetProblemDetails(problem.id);
  const city = citiesList.find((e) => e.id === Number(problem.city));

  const imagesWithThumbnail = useMemo<IUpload[]>(() => {
    return [
      {
        createdAt: problem.createdAt,
        id: Number.MIN_SAFE_INTEGER,
        entityId: problem.id,
        name: problem.thumbnail,
        type: UploadedFileType.PROBLEM,
        updatedAt: problem.createdAt,
      },
      ...images,
    ];
  }, [images, problem]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <div>
            <Typography variant="h5">{problem.title}</Typography>
            <p className="text-xs text-brand-muted-fg font-mono mt-0.5">
              {problem.carMake} {problem.carModel} · {problem.carYear} ·{" "}
              {city?.name}
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
            <p className="text-sm text-brand-fg leading-relaxed">
              {problem.description}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-brand-muted-fg">
              <span className="flex items-center gap-1">
                <HiOutlineClock size={11} /> {timeAgoAze(problem.createdAt)}{" "}
                əvvəl
              </span>

              <span className="flex items-center gap-1">
                <HiOutlineMapPin size={11} /> {city?.name}
              </span>
              {problem.isVip && (
                <span className="badge-premium">
                  ⭐ {tFeed("premium_badge")}
                </span>
              )}
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-brand-fg">
                Mexanik Təklifləri
                <span className="ml-2 text-primary-DEFAULT font-mono tabular-nums">
                  ({offers.length})
                </span>
              </h3>
            </div>

            {offers.length === 0 ? (
              <div className="text-center py-8 text-brand-muted-fg">
                <HiOutlineChatBubbleLeftRight
                  size={32}
                  className="mx-auto mb-2 opacity-30"
                />
                <p className="text-sm">{tFeed("no_offers")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {offers.map((offer) => (
                  <OfferListItem
                    onRefetch={refetch}
                    offer={offer}
                    problem={problem}
                    key={offer.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {!isMyPost && (
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
    </div>
  );
}
