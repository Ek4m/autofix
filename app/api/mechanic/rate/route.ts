import {
  initDb,
  MechanicReview,
  Offer,
  OfferAgreement,
  Problem,
  User,
} from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { PROBLEM_STATUS } from "@/modules/problems/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) return NextResponse.json("", { status: 401 });
  const { problemId, comment, rating } = await request.json();
  const problem = await Problem.findOne({
    where: { id: problemId, status: PROBLEM_STATUS.COMPLETED, userId: user.id },
    attributes: ["id"],
    include: [
      {
        model: OfferAgreement,
        as: "offerAgreement",
        attributes: ["id"],
        include: [
          {
            model: Offer,
            as: "offer",
            attributes: ["id"],
            include: [{ model: User, as: "user", attributes: ["id"] }],
          },
        ],
      },
    ],
  });
  if (
    !problem ||
    !problem.get().offerAgreement ||
    !problem.get().offerAgreement.get().offer ||
    !problem.get().offerAgreement.get().offer.get().user
  )
    return NextResponse.json("Problem tapılmadı", { status: 404 });
  const offerId = problem.get().offerAgreement.get().offer.id;
  const offerAgreementId = problem.get().offerAgreement.id;
  const mechanicId = problem.get().offerAgreement.get().offer.get().user.id;
  const record = await MechanicReview.create({
    rating,
    comment,
    problemId,
    offerId,
    mechanicId,
    userId: user.id,
    offerAgreementId,
  });
  return NextResponse.json({ data: record });
};
