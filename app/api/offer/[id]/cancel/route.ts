import { initDb, Offer, User } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { OFFER_STATUS } from "@/modules/problems/constants";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  const payload = await params;
  const { id } = payload;
  const offer = await Offer.findByPk(id, {
    include: [{ model: User, as: "user" }],
  });
  if (!offer || ("user" in offer && (offer.user as User).get().id !== user?.id))
    return NextResponse.json({ message: "Təklif tapılmadı!" }, { status: 400 });
  await offer.update({ status: OFFER_STATUS.DECLINED });
  return NextResponse.json({ data: offer });
};
