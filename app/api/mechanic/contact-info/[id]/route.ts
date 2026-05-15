import { initDb, SpecialistInfo, User } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const authUser = await getAuthUserFromRequest();
  if (!authUser)
    return NextResponse.json(
      { message: "Əlaqə məlumatları üçün daxil olmalısınız" },
      { status: 401 },
    );
  const payload = await params;
  const { id } = payload;
  const user = await User.findByPk(id, {
    attributes: ["phoneNumber"],
  });
  if (!user)
    return NextResponse.json(
      { message: "İstifadəçi tapılmadı" },
      { status: 401 },
    );
  const specialistInfo = await SpecialistInfo.findOne({
    where: { userId: id },
    attributes: ["rawAddress", "locationUrl"],
  });
  if (!specialistInfo)
    return NextResponse.json(
      { message: "İstifadəçi tapılmadı" },
      { status: 401 },
    );
  return NextResponse.json({
    data: {
      phoneNumber: user.get().phoneNumber,
      rawAddress: specialistInfo.get().rawAddress,
      locationUrl: specialistInfo.get().locationUrl,
    },
  });
};
