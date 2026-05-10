"use client";
import React, { useState, useMemo } from "react";
import Topbar from "@/components/Topbar";
import AppImage from "@/components/ui/AppImage";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { FiSearch, FiX, FiChevronDown, FiPlus } from "react-icons/fi";
import {
  FaStar,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaWrench,
  FaAward,
  FaCreditCard,
  FaInfoCircle,
  FaSlidersH,
} from "react-icons/fa";
import { useAuth } from "@/modules/auth/contexts";
import { PostServiceModal } from "@/modules/services/components/post";
import { MechanicService } from "@/modules/mechanic/types/interfaces";

const SERVICE_CATEGORIES = [
  { key: "all", label: "Hamısı", icon: "🔍" },
  { key: "engine", label: "Mühərrik", icon: "⚙️" },
  { key: "brakes", label: "Əyləclər", icon: "🛑" },
  { key: "electrical", label: "Elektrik", icon: "⚡" },
  { key: "suspension", label: "Asqı", icon: "🔧" },
  { key: "transmission", label: "Sürət qutusu", icon: "⚙️" },
  { key: "ac", label: "Kondisioner", icon: "❄️" },
  { key: "body", label: "Kuzov", icon: "🚗" },
];

const RATING_OPTIONS = [
  { value: 0, label: "Hamısı" },
  { value: 4, label: "4+ ⭐" },
  { value: 4.5, label: "4.5+ ⭐" },
  { value: 4.8, label: "4.8+ ⭐" },
];

export default function MechanicServiceListingsScreen() {
  const { user, isMechanic } = useAuth();
  const tServices = useTranslations("services");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] =
    useState<MechanicService | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const isLoggedIn = Boolean(user);

  const filtered = useMemo(() => {
    let result = [];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(q) ||
          s.mechanicName.toLowerCase().includes(q) ||
          s.garageName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }
    if (activeCategory !== "all")
      result = result.filter((s) => s.category === activeCategory);
    if (verifiedOnly) result = result.filter((s) => s.isVerified);
    if (availableOnly) result = result.filter((s) => s.isAvailable);
    if (minRating > 0) result = result.filter((s) => s.rating >= minRating);
    result = result.filter((s) => s.priceMin <= priceMax);
    result.sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0));
    return result;
  }, [
    search,
    activeCategory,
    verifiedOnly,
    availableOnly,
    minRating,
    priceMax,
  ]);

  const handleContact = (service: MechanicService) => {
    if (!isLoggedIn) {
      toast.error("Mexanikə müraciət etmək üçün daxil olun.");
      return;
    }
    toast.success(`${service.mechanicName} ilə əlaqə: ${service.phone}`);
  };

  const activeFiltersCount = [
    verifiedOnly,
    availableOnly,
    minRating > 0,
    priceMax < 1000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Topbar />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-brand-fg">
              {tServices("title")}
            </h1>
            <p className="text-sm text-brand-muted-fg mt-0.5">
              {tServices("subtitle")}
            </p>
          </div>
          {isMechanic && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-navy-DEFAULT/5 border border-navy-DEFAULT/10 rounded-lg">
                <FaCreditCard size={13} className="text-navy-DEFAULT" />
                <span className="text-xs font-medium text-navy-DEFAULT">
                  Standart: 2.50 ₼ · Premium: 6.00 ₼
                </span>
              </div>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.error("Xidmət paylaşmaq üçün daxil olun.");
                    return;
                  }
                  setShowPostModal(true);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus size={16} />
                {tServices("post_service")}
              </button>
            </div>
          )}
        </div>

        {/* Search + filter bar */}
        <div className="card-surface p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <FiSearch
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted-fg"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tServices("search")}
                className="input-field pl-9 pr-9"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted-fg hover:text-brand-fg transition-colors"
                >
                  <FiX size={15} />
                </button>
              )}
            </div>

            <div className="flex gap-2 shrink-0">
              {/* Rating filter */}
              <div className="relative">
                <button
                  onClick={() => setRatingOpen(!ratingOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-brand-border bg-white text-sm font-medium text-brand-fg hover:bg-brand-muted transition-all duration-150"
                >
                  <FaStar size={14} className="text-amber-400" />
                  {minRating > 0 ? `${minRating}+` : "Reytinq"}
                  <FiChevronDown
                    size={13}
                    className={`text-brand-muted-fg transition-transform duration-150 ${ratingOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {ratingOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-brand-border rounded-xl shadow-card py-1 min-w-[140px] z-20 animate-fade-in">
                    {RATING_OPTIONS.map((opt) => (
                      <button
                        key={`rating-opt-${opt.value}`}
                        onClick={() => {
                          setMinRating(opt.value);
                          setRatingOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-brand-muted ${minRating === opt.value ? "font-semibold text-primary-DEFAULT" : "text-brand-fg"}`}
                      >
                        {opt.label}
                        {minRating === opt.value && (
                          <FaCheckCircle
                            size={13}
                            className="text-primary-DEFAULT"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Advanced filters toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
                  activeFiltersCount > 0
                    ? "bg-primary-DEFAULT/10 border-primary-DEFAULT/30 text-primary-DEFAULT"
                    : "bg-white border-brand-border text-brand-fg hover:bg-brand-muted"
                }`}
              >
                <FaSlidersH size={14} />
                Filtrlər
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-DEFAULT text-white text-xs font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced filters panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-brand-border animate-slide-up">
              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 relative cursor-pointer ${verifiedOnly ? "bg-primary-DEFAULT" : "bg-brand-muted"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${verifiedOnly ? "left-[22px]" : "left-0.5"}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-fg">
                    {tServices("filter_verified")}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    onClick={() => setAvailableOnly(!availableOnly)}
                    className={`w-11 h-6 rounded-full transition-all duration-200 relative cursor-pointer ${availableOnly ? "bg-primary-DEFAULT" : "bg-brand-muted"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${availableOnly ? "left-[22px]" : "left-0.5"}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-fg">
                    Yalnız mövcud
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-brand-fg whitespace-nowrap">
                    Maks. qiymət:
                  </span>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-32 accent-primary-DEFAULT"
                  />
                  <span className="text-sm font-bold text-brand-fg tabular-nums font-mono w-16">
                    {priceMax} ₼
                  </span>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      setVerifiedOnly(false);
                      setAvailableOnly(false);
                      setMinRating(0);
                      setPriceMax(1000);
                    }}
                    className="text-sm text-primary-DEFAULT font-medium hover:text-primary-dark flex items-center gap-1 transition-colors ml-auto"
                  >
                    <FiX size={13} /> Sıfırla
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Category chips */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={`scat-${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                className={`filter-chip whitespace-nowrap shrink-0 ${activeCategory === cat.key ? "filter-chip-active" : "filter-chip-inactive"}`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-brand-muted-fg">
            <span className="font-semibold text-brand-fg tabular-nums">
              {filtered.length}
            </span>{" "}
            xidmət tapıldı
          </p>
          {(search || activeCategory !== "all" || activeFiltersCount > 0) && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setVerifiedOnly(false);
                setAvailableOnly(false);
                setMinRating(0);
                setPriceMax(1000);
              }}
              className="text-sm text-primary-DEFAULT font-medium hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <FiX size={13} /> Filtrləri sıfırla
            </button>
          )}
        </div>

        {/* Service cards grid */}
        {filtered.length === 0 ? (
          <div className="card-surface p-16 text-center">
            <FaWrench
              size={48}
              className="mx-auto text-brand-muted-fg/40 mb-4"
            />
            <h3 className="text-lg font-bold text-brand-fg mb-2">
              Heç bir xidmət tapılmadı
            </h3>
            <p className="text-sm text-brand-muted-fg mb-4">
              Filtrləri dəyişdirin və ya axtarış sözünü silin
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setVerifiedOnly(false);
                setAvailableOnly(false);
                setMinRating(0);
                setPriceMax(1000);
              }}
              className="btn-primary"
            >
              Filtrləri sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewProfile={() => setSelectedService(service)}
                onContact={() => handleContact(service)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedService && (
        <MechanicProfileDrawer
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onContact={() => handleContact(selectedService)}
        />
      )}

      {showPostModal && (
        <PostServiceModal onClose={() => setShowPostModal(false)} />
      )}
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  onViewProfile,
  onContact,
}: {
  service: MechanicService;
  onViewProfile: () => void;
  onContact: () => void;
}) {
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");
  const catIcon =
    SERVICE_CATEGORIES.find((c) => c.key === service.category)?.icon ?? "🔧";

  return (
    <div
      className={`card-surface overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col ${service.isPremium ? "premium-glow" : ""}`}
    >
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative shrink-0">
            <AppImage
              src={service.mechanicAvatar}
              alt={`${service.mechanicName} mexanik profil şəkli`}
              width={52}
              height={52}
              className="rounded-xl border border-brand-border"
            />
            {service.isAvailable ? (
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"
                title="Mövcuddur"
              />
            ) : (
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"
                title="Məşğuldur"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-bold text-brand-fg truncate">
                {service.mechanicName}
              </h3>
              {service.isVerified && (
                <span className="badge-verified text-xs shrink-0">
                  <FaShieldAlt size={9} /> {tServices("verified")}
                </span>
              )}
            </div>
            <p className="text-xs text-brand-muted-fg truncate mt-0.5">
              {service.garageName}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <FaStar size={12} className="text-amber-400" />
              <span className="text-xs font-bold text-brand-fg tabular-nums">
                {service.rating}
              </span>
              <span className="text-xs text-brand-muted-fg">
                ({service.reviewCount} {tServices("reviews")})
              </span>
            </div>
          </div>
          {service.isPremium && (
            <span className="badge-premium shrink-0 text-xs">⭐</span>
          )}
        </div>

        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg leading-none mt-0.5">{catIcon}</span>
          <h4 className="text-sm font-bold text-brand-fg leading-snug">
            {service.serviceName}
          </h4>
        </div>

        <p className="text-xs text-brand-muted-fg line-clamp-2 leading-relaxed mb-3">
          {service.description}
        </p>

        <div className="flex gap-1.5 flex-wrap mb-3">
          {service.specializations.slice(0, 3).map((spec) => (
            <span
              key={`spec-${service.id}-${spec}`}
              className="text-xs bg-brand-muted text-brand-muted-fg rounded-full px-2.5 py-0.5 font-medium"
            >
              {spec}
            </span>
          ))}
          {service.specializations.length > 3 && (
            <span className="text-xs bg-brand-muted text-brand-muted-fg rounded-full px-2.5 py-0.5 font-medium">
              +{service.specializations.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-brand-muted-fg">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt size={11} /> {service.location}
          </span>
          <span className="flex items-center gap-1">
            <FaAward size={11} /> {service.experience} {tCommon("year")}
          </span>
          <span
            className={`flex items-center gap-1 ml-auto font-medium ${service.isAvailable ? "text-emerald-600" : "text-gray-400"}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${service.isAvailable ? "bg-emerald-500" : "bg-gray-400"}`}
            />
            {service.isAvailable ? tServices("available") : tServices("busy")}
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
          <button
            onClick={onViewProfile}
            className="p-2 rounded-lg border border-brand-border hover:bg-brand-muted hover:border-primary-DEFAULT/30 transition-all duration-150"
            title="Profili gör"
          >
            <FaInfoCircle size={15} className="text-brand-muted-fg" />
          </button>
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

// ─── Mechanic Profile Drawer ──────────────────────────────────────────────────
function MechanicProfileDrawer() {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in"></div>
  );
}
