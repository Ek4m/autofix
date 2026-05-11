import { useTranslations } from "next-intl";
import { FaAward, FaInfoCircle, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import categoryList from "@/data/categories.json";
import { IService } from "../types/interfaces";
import ProfilePhotoWithChar from "@/components/ui/profilePhotoWithChar";
import { useMemo } from "react";
import Link from "next/link";

export default function ServiceCard({
  service,
  onContact,
}: {
  service: IService;
  onContact: () => void;
}) {
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");
  const categories = useMemo(
    () =>
      categoryList.flatMap((cat) =>
        cat.subcategories.map((c) => ({
          ...c,
          id: c.id.toString(),
          name: c.name,
        })),
      ),
    [],
  );
  return (
    <div
      className={`card-surface overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col ${service.isVip ? "vip-glow" : ""}`}
    >
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative shrink-0">
            <ProfilePhotoWithChar title={service.user?.fullName || ""} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-bold text-brand-fg truncate">
                {service.user?.fullName}
              </h3>
            </div>
            <p className="text-xs text-brand-muted-fg truncate mt-0.5">
              {service.user?.specialistInfo?.objectName}
            </p>
          </div>
          {service.isVip && (
            <span className="badge-premium shrink-0 text-xs">⭐</span>
          )}
        </div>

        <div className="flex items-start gap-2 mb-2">
          <h4 className="text-sm font-bold text-brand-fg leading-snug">
            {service.serviceName}
          </h4>
        </div>

        <p className="text-xs text-brand-muted-fg line-clamp-2 leading-relaxed mb-3">
          {service.description}
        </p>

        <div className="flex gap-1.5 flex-wrap mb-3">
          {service.categories.slice(0, 1).map((spec) => (
            <span
              key={`spec-${service.id}-${spec}`}
              className="text-xs bg-brand-muted text-brand-muted-fg rounded-full px-2.5 py-0.5 font-medium"
            >
              {categories.find((c) => c.id === String(spec))?.name || "N/A"}
            </span>
          ))}
          {service.categories.length > 1 && (
            <span className="text-xs bg-brand-muted text-brand-muted-fg rounded-full px-2.5 py-0.5 font-medium">
              +{service.categories.length - 1}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-brand-muted-fg">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt size={11} />{" "}
            {service.user?.specialistInfo?.rawAddress}
          </span>
          <span className="flex items-center gap-1">
            <FaAward size={11} />{" "}
            {service.user?.specialistInfo?.experienceYears} {tCommon("year")}
          </span>
        </div>
      </div>

      <div className="mt-auto border-t border-brand-border px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-brand-muted-fg">
            {tServices("per_service")}
          </p>
          <p className="text-base font-bold text-brand-fg tabular-nums">
            {service.priceMin} – {service.priceMax}{" "}
            <span className="text-sm font-semibold">₼</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/mechanic-info/${service.userId}`} passHref>
            <button
              className="p-2 rounded-lg border border-brand-border hover:bg-brand-muted hover:border-primary-DEFAULT/30 transition-all duration-150"
              title="Profili gör"
            >
              <FaInfoCircle size={15} className="text-brand-muted-fg" />
            </button>
          </Link>
          <button
            onClick={onContact}
            className="btn-primary flex items-center gap-1.5 px-3 py-2 text-sm"
          >
            <FaPhone size={13} />
            {tServices("contact")}
          </button>
        </div>
      </div>
    </div>
  );
}
