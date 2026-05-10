import { initDb, Problem, VipInfo } from "@/config/db";
import { EntityType } from "@/constants/enums";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  const body = await request.json();
  const prob = await Problem.create({
    ...body,
    userId: user?.id,
  });
  if (body.isVip) {
    const now = new Date();
    const expireTimeInMs = 7 * 24 * 3600 * 1000;
    now.setTime(now.getTime() + expireTimeInMs);
    await VipInfo.create({
      expiresAt: now,
      entityId: prob.get().id,
      entityType: EntityType.PROBLEM,
    });
  }
  return NextResponse.json({ data: prob });
};
