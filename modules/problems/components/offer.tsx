import AppImage from "@/components/ui/AppImage";
import { CarProblem, MECHANIC_OFFERS } from "@/lib/mockData";
import { useAuth } from "@/modules/auth/contexts";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiOutlineClock, HiOutlineShieldCheck, HiStar } from "react-icons/hi";
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
  HiXMark,
} from "react-icons/hi2";

export function OffersModal({
  problem,
  onClose,
  onMakeOffer,
}: {
  problem: CarProblem;
  onClose: () => void;
  onMakeOffer: () => void;
}) {
  const { isMechanic } = useAuth();
  const tFeed = useTranslations("feed");
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <div>
            <h2 className="text-base font-bold text-brand-fg line-clamp-1">
              {problem.title}
            </h2>
            <p className="text-xs text-brand-muted-fg font-mono mt-0.5">
              {problem.carMake} {problem.carModel} · {problem.carYear} ·{" "}
              {problem.location}
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
          {problem.photos.length > 0 && (
            <div className="px-5 pt-4">
              <div className="relative h-52 rounded-xl overflow-hidden bg-brand-muted">
                <AppImage
                  src={problem.photos[activeImg]}
                  alt={`${problem.carMake} ${problem.carModel} şəkli ${activeImg + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
              {problem.photos.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {problem.photos.map((photo, i) => (
                    <button
                      key={`modal-thumb-${problem.id}-${i}`}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-primary-DEFAULT" : "border-transparent"}`}
                    >
                      <AppImage
                        src={photo}
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
                <HiOutlineClock size={11} /> {problem.timeAgo} əvvəl
              </span>

              <span className="flex items-center gap-1">
                <HiOutlineMapPin size={11} /> {problem.location}
              </span>
              {problem.isPremium && (
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
                  ({MECHANIC_OFFERS.length})
                </span>
              </h3>
            </div>

            {MECHANIC_OFFERS.length === 0 ? (
              <div className="text-center py-8 text-brand-muted-fg">
                <HiOutlineChatBubbleLeftRight
                  size={32}
                  className="mx-auto mb-2 opacity-30"
                />
                <p className="text-sm">{tFeed("no_offers")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {MECHANIC_OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-4 bg-brand-bg rounded-xl border border-brand-border hover:border-primary-DEFAULT/30 transition-all duration-150"
                  >
                    <div className="flex items-start gap-3">
                      <AppImage
                        src={offer.mechanicAvatar}
                        alt={`${offer.mechanicName} mexanik avatarı`}
                        width={40}
                        height={40}
                        className="rounded-full border border-brand-border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-brand-fg">
                            {offer.mechanicName}
                          </span>
                          {offer.isVerified && (
                            <span className="badge-verified text-xs">
                              <HiOutlineShieldCheck size={10} /> Doğrulanmış
                            </span>
                          )}
                          <div className="flex items-center gap-1 ml-auto">
                            <HiStar
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                            <span className="text-xs font-semibold text-brand-fg tabular-nums">
                              {offer.rating}
                            </span>
                            <span className="text-xs text-brand-muted-fg">
                              ({offer.reviewCount})
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-brand-muted-fg mt-1.5 leading-relaxed">
                          {offer.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2.5">
                          <span className="text-lg font-bold text-primary-DEFAULT tabular-nums">
                            {offer.price} ₼
                          </span>
                          <span className="text-xs text-brand-muted-fg flex items-center gap-1">
                            <HiOutlineClock size={11} /> {offer.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!isMechanic && (
                      <button className="mt-3 w-full btn-navy text-sm py-2">
                        Bu mexanikə müraciət et
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isMechanic && problem.status === "open" && (
          <div className="px-5 py-4 border-t border-brand-border shrink-0">
            <button
              onClick={onMakeOffer}
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
