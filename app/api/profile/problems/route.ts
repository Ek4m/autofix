import {
  CarBrand,
  CarModel,
  Category,
  initDb,
  Problem,
  User,
} from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const problems = await Problem.findAll({
    where: { userId: user.id },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password", "phoneNumber", "email"] },
      },
      { model: CarBrand, as: "brand", attributes: ["id", "name"] },
      { model: CarModel, as: "model", attributes: ["id", "name"] },
      { model: Category, as: "category" },
    ],
  });
  return NextResponse.json({ data: problems });
};
