import { initDb, Offer, Problem } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) return NextResponse.json("Unauthorized", { status: 401 });
  const offers = await Offer.findAll({
    where: { userId: user.id },
    include: [{ model: Problem, as: "problem" }],
  });
  return NextResponse.json({ data: offers });
};
