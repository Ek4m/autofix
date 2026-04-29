import { initDb, SpecialistInfo } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (user) {
    const mechanicInfo = await SpecialistInfo.findOne({
      where: { userId: user.id },
    });
    return NextResponse.json({ data: { ...user, mechanicInfo } });
  } else {
    return NextResponse.json({ data: user });
  }
};
