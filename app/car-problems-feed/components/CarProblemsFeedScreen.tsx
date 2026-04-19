"use client";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  HiArrowsUpDown,
  HiBolt,
  HiCheckCircle,
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineExclamationCircle,
  HiOutlineMapPin,
  HiOutlineXMark,
  HiXMark,
} from "react-icons/hi2";

import Topbar from "@/components/Topbar";
import { CAR_PROBLEMS, MECHANIC_OFFERS, CarProblem } from "@/lib/mockData";
import AppImage from "@/components/ui/AppImage";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineShieldCheck,
  HiStar,
} from "react-icons/hi";
import { FiMessageSquare } from "react-icons/fi";
import { FaCar } from "react-icons/fa";

const CATEGORIES = [
  { key: "all", labelKey: "all" },
  { key: "engine", labelKey: "engine" },
  { key: "brakes", labelKey: "brakes" },
  { key: "electrical", labelKey: "electrical" },
  { key: "suspension", labelKey: "suspension" },
  { key: "transmission", labelKey: "transmission" },
  { key: "ac", labelKey: "ac" },
  { key: "body", labelKey: "body" },
];

const SORT_OPTIONS = [
  { key: "newest", labelKey: "newest" },
  { key: "offers", labelKey: "offers" },
  { key: "premium", labelKey: "premium" },
];

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

const CATEGORY_ICONS: Record<string, string> = {
  engine: "⚙️",
  brakes: "🛑",
  electrical: "⚡",
  suspension: "🔧",
  transmission: "⚙️",
  ac: "❄️",
  body: "🚗",
  all: "🔍",
};

interface PostProblemForm {
  title: string;
  description: string;
  carMake: string;
  carModel: string;
  carYear: string;
  category: string;
  location: string;
  isPremium: boolean;
}

export default function CarProblemsFeedScreen() {
  const tFeed = useTranslations("feed");
  const tCommon = useTranslations("common");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<CarProblem | null>(
    null,
  );
  const [showPostModal, setShowPostModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isPremiumPost, setIsPremiumPost] = useState(false);

  const userQuotaUsed = false;
  const isLoggedIn = false;
  const userRole = "user";

  const postForm = useForm<PostProblemForm>({
    defaultValues: { isPremium: false },
  });

  const filtered = useMemo(() => {
    let result = [...CAR_PROBLEMS];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.carMake.toLowerCase().includes(q) ||
          p.carModel.toLowerCase().includes(q),
      );
    }
    if (activeCategory !== "all")
      result = result.filter((p) => p.category === activeCategory);
    if (premiumOnly) result = result.filter((p) => p.isPremium);
    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === "offers") {
      result.sort((a, b) => b.offerCount - a.offerCount);
    } else if (sortBy === "premium") {
      result.sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0));
    }
    return result;
  }, [search, activeCategory, premiumOnly, sortBy]);

  const handlePostSubmit = async (data: PostProblemForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setShowPostModal(false);
    postForm.reset();
    toast.success(
      "Probleminiz uğurla paylaşıldı! Mexaniklər tezliklə cavab verəcək.",
    );
  };

  const handleMakeOffer = () => {
    if (!isLoggedIn) {
      toast.error("Təklif vermək üçün mexanik hesabına daxil olun.");
      return;
    }
    setShowOfferModal(true);
  };

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sortBy)?.labelKey ?? "newest";

  return (
    <div className="min-h-screen bg-brand-bg">
      <Topbar
        isLoggedIn={isLoggedIn}
        userRole={userRole as "user" | "mechanic"}
      />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-brand-fg">
              {tFeed("title")}
            </h1>
            <p className="text-sm text-brand-muted-fg mt-0.5">
              {tFeed("subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn && userRole === "user" && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                  userQuotaUsed
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {userQuotaUsed ? (
                  <HiOutlineExclamationCircle size={13} />
                ) : (
                  <HiCheckCircle size={13} />
                )}
                {userQuotaUsed ? tFeed("quota_used") : tFeed("quota")}
              </div>
            )}
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("Problem paylaşmaq üçün daxil olun.");
                  return;
                }
                if (userQuotaUsed && userRole === "user") {
                  toast.error("Bu ay limitinizi istifadə etdiniz.");
                  return;
                }
                setShowPostModal(true);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <HiOutlinePlus size={16} />
              {tFeed("post_problem")}
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="card-surface p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 min-w-0">
              <HiOutlineSearch
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted-fg"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tFeed("search")}
                className="input-field pl-9 pr-9"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted-fg hover:text-brand-fg transition-colors"
                >
                  <HiOutlineXMark size={15} />
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-brand-border bg-white text-sm font-medium text-brand-fg hover:bg-brand-muted transition-all duration-150"
              >
                <HiArrowsUpDown size={14} className="text-brand-muted-fg" />

                {tFeed(`sort.${currentSortLabel}`)}

                <HiChevronDown
                  size={13}
                  className={`text-brand-muted-fg transition-transform duration-150 ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-brand-border rounded-xl shadow-card py-1 min-w-[180px] z-20 animate-fade-in">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={`sort-${opt.key}`}
                      onClick={() => {
                        setSortBy(opt.key);
                        setSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-brand-muted ${
                        sortBy === opt.key
                          ? "font-semibold text-primary-DEFAULT"
                          : "text-brand-fg"
                      }`}
                    >
                      {tFeed(`sort.${opt.labelKey}`)}
                      {sortBy === opt.key && (
                        <HiCheckCircle size={14} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setPremiumOnly(!premiumOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 shrink-0 ${
                premiumOnly
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-white border-brand-border text-brand-muted-fg hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              <HiStar size={14} />
              {tFeed("filter.premium")}
            </button>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={`cat-${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                className={`filter-chip whitespace-nowrap shrink-0 ${
                  activeCategory === cat.key
                    ? "filter-chip-active"
                    : "filter-chip-inactive"
                }`}
              >
                <span>{CATEGORY_ICONS[cat.key]}</span>
                {tFeed(`filter.${cat.labelKey}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-brand-muted-fg">
            <span className="font-semibold text-brand-fg tabular-nums">
              {filtered.length}
            </span>{" "}
            problem tapıldı
          </p>
          {(search || activeCategory !== "all" || premiumOnly) && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setPremiumOnly(false);
              }}
              className="text-sm text-primary-DEFAULT font-medium hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <HiXMark size={13} /> Filtrləri sıfırla
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="card-surface p-16 text-center">
            <FaCar size={48} className="mx-auto text-brand-muted-fg/40 mb-4" />
            <h3 className="text-lg font-bold text-brand-fg mb-2">
              Heç bir problem tapılmadı
            </h3>
            <p className="text-sm text-brand-muted-fg mb-4">
              Filtrləri dəyişdirin və ya axtarış sözünü silin
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setPremiumOnly(false);
              }}
              className="btn-primary"
            >
              Filtrləri sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
            {filtered.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onViewOffers={() => setSelectedProblem(problem)}
                onMakeOffer={handleMakeOffer}
                userRole={userRole as "user" | "mechanic"}
              />
            ))}
          </div>
        )}
      </main>

      {selectedProblem && (
        <OffersModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onMakeOffer={handleMakeOffer}
          userRole={userRole as "user" | "mechanic"}
        />
      )}

      {showPostModal && (
        <PostProblemModal
          onClose={() => {
            setShowPostModal(false);
            postForm.reset();
          }}
          onSubmit={handlePostSubmit}
          form={postForm}
          isSubmitting={isSubmitting}
          isPremium={isPremiumPost}
          onPremiumChange={setIsPremiumPost}
        />
      )}
    </div>
  );
}

// ─── Problem Card ─────────────────────────────────────────────────────────────
function ProblemCard({
  problem,
  onViewOffers,
  onMakeOffer,
  userRole,
}: {
  problem: CarProblem;
  onViewOffers: () => void;
  onMakeOffer: () => void;
  userRole: "user" | "mechanic";
}) {
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
          {userRole === "mechanic" && problem.status === "open" && (
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

// ─── Offers Modal ─────────────────────────────────────────────────────────────
function OffersModal({
  problem,
  onClose,
  onMakeOffer,
  userRole,
}: {
  problem: CarProblem;
  onClose: () => void;
  onMakeOffer: () => void;
  userRole: "user" | "mechanic";
}) {
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
                    {userRole === "user" && (
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

        {userRole === "mechanic" && problem.status === "open" && (
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

// ─── Post Problem Modal ───────────────────────────────────────────────────────
function PostProblemModal({
  onClose,
  onSubmit,
  form,
  isSubmitting,
  isPremium,
  onPremiumChange,
}: {
  onClose: () => void;
  onSubmit: (data: PostProblemForm) => void;
  form: ReturnType<typeof useForm<PostProblemForm>>;
  isSubmitting: boolean;
  isPremium: boolean;
  onPremiumChange: (v: boolean) => void;
}) {
  const tCommon = useTranslations("common");
  const tFeed = useTranslations("feed");
  const CAR_MAKES = [
    "Toyota",
    "Hyundai",
    "Kia",
    "BMW",
    "Mercedes-Benz",
    "Volkswagen",
    "Nissan",
    "Honda",
    "Chevrolet",
    "Ford",
  ];
  const CATS = [
    "engine",
    "brakes",
    "electrical",
    "suspension",
    "transmission",
    "ac",
    "body",
  ];
  const CITIES_LIST = ["Bakı", "Sumqayıt", "Gəncə", "Lənkəran", "Mingəçevir"];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-xl max-h-[95vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-modal animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
          <h2 className="text-base font-bold text-brand-fg">Problem Paylaş</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-brand-muted transition-colors"
          >
            <HiXMark size={18} className="text-brand-muted-fg" />
          </button>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-y-auto flex-1 px-5 py-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              Problem başlığı
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Mühərrik işə salınanda qəribə səs çıxarır"
              {...form.register("title", {
                required: "Başlıq tələb olunur",
                minLength: { value: 10, message: "Min 10 simvol" },
              })}
            />
            {form.formState.errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-fg mb-1.5">
              Ətraflı təsvir
            </label>
            <textarea
              rows={4}
              className="input-field resize-none"
              placeholder="Problemin nə vaxtdan başladığını yazın..."
              {...form.register("description", {
                required: "Təsvir tələb olunur",
                minLength: { value: 20, message: "Min 20 simvol" },
              })}
            />
            {form.formState.errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                Marka
              </label>
              <select
                className="input-field"
                {...form.register("carMake", { required: "Marka seçin" })}
              >
                <option value="">Seçin</option>
                {CAR_MAKES.map((m) => (
                  <option key={`make-${m}`} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {form.formState.errors.carMake && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.carMake.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                Model
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Camry"
                {...form.register("carModel", {
                  required: "Model tələb olunur",
                })}
              />
              {form.formState.errors.carModel && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.carModel.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                İl
              </label>
              <input
                type="number"
                className="input-field font-mono"
                placeholder="2019"
                min="1990"
                max="2026"
                {...form.register("carYear", { required: "İl tələb olunur" })}
              />
              {form.formState.errors.carYear && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.carYear.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                Kateqoriya
              </label>
              <select
                className="input-field"
                {...form.register("category", { required: "Kateqoriya seçin" })}
              >
                <option value="">Seçin</option>
                {CATS.map((c) => (
                  <option key={`pcat-${c}`} value={c}>
                    {tFeed(`filter.${c}`)}
                  </option>
                ))}
              </select>
              {form.formState.errors.category && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-fg mb-1.5">
                Şəhər
              </label>
              <select
                className="input-field"
                {...form.register("location", { required: "Şəhər seçin" })}
              >
                <option value="">Seçin</option>
                {CITIES_LIST.map((c) => (
                  <option key={`pcity-${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {form.formState.errors.location && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${isPremium ? "border-amber-400 bg-amber-50" : "border-brand-border hover:border-amber-300"}`}
            onClick={() => onPremiumChange(!isPremium)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${isPremium ? "bg-amber-400" : "bg-brand-muted"}`}
                >
                  <HiStar
                    size={18}
                    className={isPremium ? "text-white" : "text-brand-muted-fg"}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-fg">
                    Premium Post — 0 ₼
                  </p>
                  <p className="text-xs text-brand-muted-fg">
                    İstifadəçilər üçün pulsuzdur
                  </p>
                </div>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${isPremium ? "bg-amber-400" : "bg-brand-muted"}`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${isPremium ? "left-[22px]" : "left-0.5"}`}
                />
              </div>
            </div>
            {isPremium && (
              <p className="mt-2 text-xs text-amber-700 flex items-center gap-1.5">
                <HiBolt size={11} /> Postunuz lentdə birinci sırada göstəriləcək
              </p>
            )}
          </div>
        </form>

        <div className="px-5 py-4 border-t border-brand-border shrink-0 flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 py-3">
            {tCommon("cancel")}
          </button>
          <button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0z"
                  />
                </svg>{" "}
                Göndərilir...
              </>
            ) : (
              <>
                {tCommon("submit")} <HiChevronUp size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
