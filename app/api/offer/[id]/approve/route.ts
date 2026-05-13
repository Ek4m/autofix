import { initDb, Offer, OfferAgreement, Problem, User } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { OFFER_STATUS } from "@/modules/problems/constants";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  const payload = await params;
  const { id } = payload;
  const offer = await Offer.findByPk(id, {
    include: [
      { model: User, as: "user" },
      { model: Problem, as: "problem" },
    ],
  });
  if (!offer || offer?.get().problem.userId !== user?.id)
    return NextResponse.json({ message: "Təklif tapılmadı!" }, { status: 400 });
  await offer.update({ status: OFFER_STATUS.ACCEPTED });
  await OfferAgreement.create({
    offerId: offer.get().id,
    problemId: offer.get().problem.id,
  });
  return NextResponse.json({ data: offer });
};
