import { initDb, Problem, VipInfo } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  const body = await request.json();
  const { vipInfo, ...restOfBody } = body;
  const prob = await Problem.create({
    ...restOfBody,
    userId: user?.id,
  });
  if (restOfBody.isVip) {
    const now = new Date();
    const expireTimeInMs =
      (Number(vipInfo.vipLifeTime) || 1) * 24 * 3600 * 1000;
    now.setTime(now.getTime() + expireTimeInMs);
    await VipInfo.create({
      ...vipInfo,
      expiresAt: now,
      problemId: prob.get().id,
    });
  }
  return NextResponse.json({ data: prob });
};
