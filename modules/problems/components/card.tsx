import AppImage from "@/components/ui/AppImage";
import { CarProblem } from "@/lib/mockData";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { HiCheckCircle, HiOutlineClock } from "react-icons/hi";
import { HiBolt, HiOutlineArrowPath, HiOutlineMapPin } from "react-icons/hi2";
import { CATEGORY_ICONS } from "../vault";
import { FaCar } from "react-icons/fa";
import { useAuth } from "@/modules/auth/contexts";

const STATUS_CONFIG: Record<
  string,
  { labelKey: string; color: string; icon: React.ReactNode }
> = {
  open: {
    labelKey: "open",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <HiCheckCircle size={14} />,
  },
  in_progress: {
    labelKey: "in_progress",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <HiOutlineArrowPath size={14} className="animate-spin" />,
  },
  resolved: {
    labelKey: "resolved",
    color: "bg-gray-100 text-gray-500 border-gray-200",
    icon: <HiCheckCircle size={14} />,
  },
};

export default function ProblemCard({
  problem,
  onViewOffers,
  onMakeOffer,
}: {
  problem: CarProblem;
  onViewOffers: () => void;
  onMakeOffer: () => void;
}) {
  const { isMechanic } = useAuth();
  const tFeed = useTranslations("feed");
  const tCommon = useTranslations("common");
  const [imgIdx, setImgIdx] = useState(0);
  const status = STATUS_CONFIG[problem.status];

  return (
    <div
      className={`card-surface overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group ${problem.isPremium ? "premium-glow ring-amber-300/60" : ""}`}
    >
      <div className="relative h-48 bg-brand-muted overflow-hidden">
        {problem.photos.length > 0 ? (
          <AppImage
            src={problem.photos[imgIdx]}
            alt={`${problem.carMake} ${problem.carModel} - ${problem.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaCar size={40} className="text-brand-muted-fg/30" />
          </div>
        )}
        {problem.photos.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {problem.photos.map((_, i) => (
              <button
                key={`dot-${problem.id}-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-3" : "bg-white/60"}`}
              />
            ))}
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
          {problem.isPremium && (
            <span className="badge-premium text-xs">
              ⭐ {tFeed("premium_badge")}
            </span>
          )}
          <span className={`badge-status border text-xs ${status.color}`}>
            {status.icon}
            {tFeed(status.labelKey)}
          </span>
        </div>
        <div
          className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${problem.offerCount > 0 ? "bg-primary-DEFAULT text-white" : "bg-black/40 text-white"}`}
        >
          <FiMessageSquare size={11} />
          {problem.offerCount} {tFeed("offers")}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <AppImage
            src={problem.authorAvatar}
            alt={`${problem.authorName} profil şəkli`}
            width={32}
            height={32}
            className="rounded-full border border-brand-border shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-brand-fg truncate">
              {problem.authorName}
            </p>
            <p className="text-xs text-brand-muted-fg font-mono tabular-nums">
              {problem.carMake} {problem.carModel} · {problem.carYear}
            </p>
          </div>
        </div>

        <div className="mb-2">
          <span className="inline-flex items-center gap-1 bg-brand-muted text-brand-muted-fg text-xs font-medium rounded-full px-2.5 py-0.5">
            {CATEGORY_ICONS[problem.category]}{" "}
            {tFeed(`filter.${problem.category}`)}
          </span>
        </div>

        <h3 className="text-sm font-bold text-brand-fg mb-1.5 leading-snug line-clamp-2">
          {problem.title}
        </h3>
        <p className="text-xs text-brand-muted-fg line-clamp-2 leading-relaxed mb-3">
          {problem.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-brand-muted-fg mb-4">
          <span className="flex items-center gap-1">
            <HiOutlineMapPin size={11} /> {problem.location}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock size={11} /> {problem.timeAgo} {tCommon("ago")}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onViewOffers}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-muted hover:bg-primary-DEFAULT/10 hover:text-primary-DEFAULT text-sm font-semibold text-brand-fg transition-all duration-150"
          >
            <FiMessageSquare size={14} />
            {problem.offerCount > 0
              ? `${problem.offerCount} ${tFeed("view_offers")}`
              : tFeed("no_offers")}
          </button>
          {isMechanic && problem.status === "open" && (
            <button
              onClick={onMakeOffer}
              className="btn-primary flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <HiBolt size={13} />
              {tFeed("make_offer")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
