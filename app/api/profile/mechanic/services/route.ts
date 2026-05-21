import { initDb, Service, SpecialistInfo, User } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) return NextResponse.json({}, { status: 401 });
  const specialistInfo = await SpecialistInfo.findOne({
    where: { userId: user.id },
  });
  if (!specialistInfo) return NextResponse.json({}, { status: 401 });
  const services = await Service.findAll({
    where: { userId: user.id },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "profilePicture"],
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
  return NextResponse.json({ data: services });
};
