import { initDb, Service, SpecialistInfo, User } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const payload = await params;
  const { id } = payload;
  const service = await Service.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["phoneNumber", "password", "email"] },
        include: [
          {
            model: SpecialistInfo,
            as: "specialistInfo",
            attributes: { exclude: ["rawAddress", "locationUrl"] },
          },
        ],
      },
    ],
  });
  if (!service)
    return NextResponse.json({ message: "Xidmət tapılmadı!" }, { status: 400 });
  return NextResponse.json({ data: service });
};
