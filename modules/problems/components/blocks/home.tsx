"use client";
import { CAR_PROBLEMS, CarProblem } from "@/lib/mockData";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { HiXMark } from "react-icons/hi2";
import { PostProblemModal } from "../post";
import { OffersModal } from "../offer";
import ProblemCard from "../card";
import { useAuth } from "@/modules/auth/contexts";
import { FaCar } from "react-icons/fa";
import HomeHead from "./homeHead";
import HomeSearch from "./homeSearch";

const HomeMain = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [sortBy] = useState("newest");
  const [selectedProblem, setSelectedProblem] = useState<CarProblem | null>(
    null,
  );
  const [showPostModal, setShowPostModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

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

  const handleMakeOffer = () => {
    if (!user) {
      toast.error("Təklif vermək üçün mexanik hesabına daxil olun.");
      return;
    }
    setShowOfferModal(true);
  };
  return (
    <>
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <HomeHead onShowPostModal={setShowPostModal} />
        <HomeSearch
          activeCategory={activeCategory}
          premiumOnly={premiumOnly}
          setActiveCategory={setActiveCategory}
          setPremiumOnly={setPremiumOnly}
        />

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
        />
      )}

      {showPostModal && (
        <PostProblemModal
          onClose={() => {
            setShowPostModal(false);
          }}
        />
      )}
    </>
  );
};

export default HomeMain;
