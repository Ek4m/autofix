import { initDb, Service, VipInfo } from "@/config/db";
import { EntityType } from "@/constants/enums";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (data: NextRequest) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  const body = await data.json();
  const newService = await Service.create({ ...body, userId: user?.id });
  if (body.isVip) {
    const now = new Date();
    const expireTimeInMs = 7 * 24 * 3600 * 1000;
    now.setTime(now.getTime() + expireTimeInMs);
    await VipInfo.create({
      expiresAt: now,
      entityId: newService.get().id,
      entityType: EntityType.SERVICE,
    });
  }
  return NextResponse.json({ data: { message: "Servis uğurla yaradıldı" } });
};
