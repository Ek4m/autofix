import { initDb, SpecialistInfo, User } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const { id } = await params;
  const user = await User.findByPk(id, {
    include: [
      {
        model: SpecialistInfo,
        as: "specialistInfo",
        attributes: { exclude: ["rawAddress", "locationUrl"] },
      },
    ],
    attributes: { exclude: ["password", "phoneNumber", "email"] },
  });
  if (!user || !("specialistInfo" in user) || !user.specialistInfo)
    return NextResponse.json({ message: "Tapılmadı" }, { status: 404 });
  return NextResponse.json({ data: user });
};
