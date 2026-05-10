import { initDb, Problem, VipInfo } from "@/config/db";
import { EntityType } from "@/constants/enums";
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
    const expireTimeInMs = 7 * 24 * 3600 * 1000;
    now.setTime(now.getTime() + expireTimeInMs);
    await VipInfo.create({
      ...vipInfo,
      expiresAt: now,
      entityId: prob.get().id,
      entityType: EntityType.PROBLEM,
    });
  }
  return NextResponse.json({ data: prob });
};
