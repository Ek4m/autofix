"use client";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { HiXMark } from "react-icons/hi2";
import { PostProblemModal } from "../post";
import ProblemCard from "../card";
import { useAuth } from "@/modules/auth/contexts";
import { FaCar } from "react-icons/fa";
import HomeHead from "./homeHead";
import HomeSearch from "./homeSearch";
import { HomeSearchContext } from "../../contexts/homeSearch";
import { useGetProblems } from "../../hooks/useGetProblems";
import { UserProblem } from "../../types/interfaces";
import { OfferSolution } from "../offer";
import { Grid, Skeleton } from "@mui/material";

const HomeMain = () => {
  const { user } = useAuth();
  const {
    category,
    setCategory,
    isVip,
    setIsVip,
    search,
    setSearch,
    orderBy,
    city,
    setCity,
  } = useContext(HomeSearchContext);

  const { data, isFetching } = useGetProblems({
    category,
    vip: Number(isVip),
    search,
    order: orderBy,
    city,
  });
  const [showPostModal, setShowPostModal] = useState(false);
  const [problemForOffering, setProblemForOffering] =
    useState<UserProblem | null>(null);

  const handleMakeOffer = (problem: UserProblem) => {
    if (!user) {
      toast.error("Təklif vermək üçün mexanik hesabına daxil olun.");
      return;
    }
    setProblemForOffering(problem);
  };
  return (
    <>
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <HomeHead onShowPostModal={setShowPostModal} />
        <HomeSearch />

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-brand-muted-fg">
            <span className="font-semibold text-brand-fg tabular-nums">
              {data?.length}
            </span>{" "}
            problem tapıldı
          </p>
          {(search || category || isVip || city) && (
            <button
              onClick={() => {
                setSearch("");
                setCategory(0);
                setIsVip(false);
                setCity("");
              }}
              className="text-sm text-primary-DEFAULT font-medium hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <HiXMark size={13} /> Filtrləri sıfırla
            </button>
          )}
        </div>

        {data?.length === 0 ? (
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
                setCategory(0);
                setIsVip(false);
              }}
              className="btn-primary"
            >
              Filtrləri sıfırla
            </button>
          </div>
        ) : (
          <Grid spacing={2} container>
            {isFetching
              ? [1, 2, 3].map((i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                    <Skeleton
                      variant="rectangular"
                      height={420}
                      sx={{ borderRadius: 4 }}
                    />
                  </Grid>
                ))
              : data?.map((problem) => (
                  <Grid key={problem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProblemCard
                      problem={problem}
                      onMakeOffer={handleMakeOffer}
                    />
                  </Grid>
                ))}
          </Grid>
        )}
      </main>
      {problemForOffering && (
        <OfferSolution
          problem={problemForOffering}
          onClose={() => setProblemForOffering(null)}
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
