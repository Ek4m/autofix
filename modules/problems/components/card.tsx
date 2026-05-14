import AppImage from "@/components/ui/AppImage";
import { useTranslations } from "next-intl";
import { FiMessageSquare } from "react-icons/fi";
import { HiCheckCircle, HiOutlineClock } from "react-icons/hi";
import { HiBolt, HiOutlineArrowPath, HiOutlineMapPin } from "react-icons/hi2";
import { useAuth } from "@/modules/auth/contexts";
import { UserProblem } from "../types/interfaces";
import { makeImagePath } from "@/helpers/fileOps";
import { timeAgoAze } from "@/helpers/timeAgoAze";
import { PROBLEM_STATUS } from "../constants";
import { getCityTitle } from "@/helpers/getCityTitle";

const STATUS_CONFIG: Record<
  string,
  { labelKey: string; color: string; icon: React.ReactNode }
> = {
  [PROBLEM_STATUS.COMPLETED]: {
    labelKey: "Tamamlandı",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <HiCheckCircle size={14} />,
  },
  [PROBLEM_STATUS.ASSIGNED]: {
    labelKey: "Davam edir",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <HiOutlineArrowPath size={14} className="animate-spin" />,
  },
  [PROBLEM_STATUS.OPEN]: {
    labelKey: "Açıqdır",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: <HiCheckCircle size={14} />,
  },
  [PROBLEM_STATUS.CANCELLED]: {
    labelKey: "Ləğv olundu",
    color: "bg-gray-100 text-gray-500 border-gray-200",
    icon: <HiCheckCircle size={14} />,
  },
};

export default function ProblemCard({
  problem,
  onViewOffers,
  onMakeOffer,
}: {
  problem: UserProblem;
  onViewOffers: () => void;
  onMakeOffer: (p: UserProblem) => void;
}) {
  const tFeed = useTranslations("feed");
  const status = STATUS_CONFIG[problem.status];
  const { isMechanic } = useAuth();

  return (
    <div
      className={`card-surface overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group ${problem.isVip ? "premium-glow ring-amber-300/60" : ""}`}
    >
      <div className="relative h-48 bg-brand-muted overflow-hidden">
        <AppImage
          src={makeImagePath(problem.thumbnail)}
          alt={`${problem.carMake} ${problem.carModel} - ${problem.title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {status && (
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
          <span className={`badge-status border text-xs ${status?.color}`}>
            {status?.icon}
            {status?.labelKey}
          </span>
        </div>
      )}

      {/* <div
          className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${problem.offerCount > 0 ? "bg-primary-DEFAULT text-white" : "bg-black/40 text-white"}`}
        >
          <FiMessageSquare size={11} />
          {problem.offerCount} {tFeed("offers")}
        </div> */}

      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-100 h-100 rounded bg-[lightgrey] p-2">
            {problem.user.fullName
              .split(" ")
              .map((c) => c[0].toUpperCase())
              .join("")}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-brand-fg truncate">
              {problem.user.fullName}
            </p>
            <p className="text-xs text-brand-muted-fg font-mono tabular-nums">
              {problem.carMake} {problem.carModel} · {problem.carYear}
            </p>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-start">
          <span className="inline-flex items-center gap-1 bg-brand-muted text-brand-muted-fg text-xs font-medium rounded-full px-2.5 py-0.5">
            {problem.category.name}
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
            <HiOutlineMapPin size={11} /> {getCityTitle(problem.city)}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock size={11} /> {timeAgoAze(problem.createdAt)} əvvəl
          </span>
          {problem.isVip && (
            <span className="badge-premium text-xs">
              ⭐ {tFeed("premium_badge")}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onViewOffers}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-muted hover:bg-primary-DEFAULT/10 hover:text-primary-DEFAULT text-sm font-semibold text-brand-fg transition-all duration-150"
          >
            <FiMessageSquare size={14} />
            {tFeed("view_offers")}
          </button>
          {isMechanic && (
            <button
              onClick={() => onMakeOffer(problem)}
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
