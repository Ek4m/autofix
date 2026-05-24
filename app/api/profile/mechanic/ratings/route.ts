import {
  initDb,
  MechanicReview,
  Problem,
  SpecialistInfo,
  User,
} from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) return NextResponse.json("User not found", { status: 404 });
  const mechanicInfo = await SpecialistInfo.findOne({
    attributes: ["id"],
    where: { userId: user.id },
  });
  if (!mechanicInfo)
    return NextResponse.json("User not found", { status: 404 });
  const reviews = await MechanicReview.findAll({
    where: { mechanicId: user.id },
    include: [
      { model: User, as: "reviewer", attributes: ["fullName"] },
      { model: Problem, as: "problem" },
    ],
  });
  return NextResponse.json({ data: reviews });
};
