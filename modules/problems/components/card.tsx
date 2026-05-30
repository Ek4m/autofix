import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FiMessageSquare } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";
import { HiBolt, HiOutlineMapPin } from "react-icons/hi2";

import AppImage from "@/components/ui/AppImage";
import { useAuth } from "@/modules/auth/contexts";
import { UserProblem } from "../types/interfaces";
import { makeImagePath } from "@/helpers/fileOps";
import { timeAgoAze } from "@/helpers/timeAgoAze";
import { PROBLEM_STATUS_CONFIG } from "../constants";
import { getCityTitle } from "@/helpers/getCityTitle";
import SubmitButton from "@/components/ui/submitButton";

export default function ProblemCard({
  problem,
  onMakeOffer,
  showActions = false,
}: {
  problem: UserProblem;
  showActions?: boolean;
  onMakeOffer: (p: UserProblem) => void;
}) {
  const tFeed = useTranslations("feed");
  const status = PROBLEM_STATUS_CONFIG[problem.status];
  const { isMechanic } = useAuth();

  return (
    <div
      className={`card-surface overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group ${problem.isVip ? "premium-glow ring-amber-300/60" : ""}`}
    >
      <div className="relative h-48 bg-brand-muted overflow-hidden">
        <AppImage
          src={makeImagePath(problem.thumbnail)}
          alt={`${problem.brand.name} ${problem.model.name} - ${problem.title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-100 h-100 rounded bg-[lightgrey] p-2">
            {problem.user?.fullName
              .split(" ")
              .map((c) => c[0].toUpperCase())
              .join("")}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-brand-fg truncate">
              {problem.user?.fullName}
            </p>
            <p className="text-xs text-brand-muted-fg font-mono tabular-nums">
              {problem.brand.name} {problem.model.name} · {problem.carYear}
            </p>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-start">
          <span className="inline-flex items-center gap-1 bg-brand-muted text-brand-muted-fg text-xs font-medium rounded-full px-2.5 py-0.5">
            {problem.category.name}
          </span>
        </div>

        <Box sx={{ height: { xs: "auto", sm: 120 } }}>
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
        </Box>

        {status && showActions && (
          <Typography
            variant="body2"
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
        <div className="flex gap-2">
          <SubmitButton
            component={Link}
            href={`/problems/${problem.id}`}
            variant="contained"
            startIcon={<FiMessageSquare size={14} />}
            title={tFeed("view_offers")}
          />

          {isMechanic && (
            <SubmitButton
              variant="outlined"
              onClick={() => onMakeOffer(problem)}
              endIcon={<HiBolt size={14} />}
              title={tFeed("make_offer")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
