import { initDb, Offer, Problem } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  const body = await request.json();
  const problem = await Problem.findByPk(body.problemId);
  if (!problem)
    return NextResponse.json(
      { message: "Problem tapılmadı!" },
      { status: 400 },
    );
  const newOffer = await Offer.create({ ...body, userId: user?.id });
  return NextResponse.json({ data: newOffer });
};
