import React, { FC } from "react";
import { MechanicOffer, UserProblem } from "../types/interfaces";
import { TIME_UNITS } from "../constants";
import { HiOutlineClock } from "react-icons/hi";
import { useAuth } from "@/modules/auth/contexts";
import SubmitButton from "@/components/ui/submitButton";

const OfferListItem: FC<{ offer: MechanicOffer; problem: UserProblem }> = ({
  offer,
  problem,
}) => {
  const { user } = useAuth();
  const isMyPost = user?.id === problem.user.id;
  return (
    <div className="p-4 bg-brand-bg rounded-xl border border-brand-border hover:border-primary-DEFAULT/30 transition-all duration-150">
      <div className="flex items-start gap-3">
        <div className="w-100 h-100 rounded bg-[lightgrey] p-2">
          {offer.user.specialistInfo?.objectName
            .split(" ")
            .map((c) => c[0].toUpperCase())
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-brand-fg">
              {offer.user.specialistInfo?.objectName}
            </span>
            {/* {offer.isVerified && (
                            <span className="badge-verified text-xs">
                              <HiOutlineShieldCheck size={10} /> Doğrulanmış
                            </span>
                          )} */}
            {/* <div className="flex items-center gap-1 ml-auto">
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
                          </div> */}
          </div>
          <p className="text-sm text-brand-muted-fg mt-1.5 leading-relaxed">
            {offer.description}
          </p>
          <div className="flex items-center gap-4 mt-2.5">
            <span className="text-lg font-bold text-primary-DEFAULT tabular-nums">
              {offer.minPrice} ₼ / {offer.maxPrice} ₼
            </span>
            <span className="text-xs text-brand-muted-fg flex items-start gap-1">
              <HiOutlineClock size={15} /> Maks: {offer.minHours}{" "}
              {TIME_UNITS.find((e) => e.value === offer.minHoursUnit)?.label} /{" "}
              Min: {offer.maxHours}{" "}
              {TIME_UNITS.find((e) => e.value === offer.maxHoursUnit)?.label}
            </span>
          </div>
        </div>
      </div>
      {isMyPost && (
        <SubmitButton variant="contained" title="Bu mexanikə müraciət et" />
      )}
    </div>
  );
};

export default OfferListItem;
