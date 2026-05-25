import { initDb, SpecialistInfo } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existingMechanicInfo = await SpecialistInfo.findOne({
    where: { userId: user.id },
  });
  if (existingMechanicInfo) {
    return NextResponse.json(
      { message: "Siz onsuz da usta statusundasınız" },
      { status: 400 },
    );
  }
  const body = await req.json();
  await SpecialistInfo.create({
    userId: user.id,
    ...body,
  });
  return NextResponse.json({
    data: { message: "Usta statusu uğurla əldə edildi" },
  });
};
