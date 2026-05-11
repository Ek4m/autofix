import { initDb, Service, SpecialistInfo, User } from "@/config/db";
import { ORDER_BY_CREATION } from "@/modules/problems/constants";
import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";

export const GET = async (request: NextRequest) => {
  await initDb();
  const searchParams = request.nextUrl.searchParams;
  const order = searchParams.get("order") || ORDER_BY_CREATION.ASC;
  const search = searchParams.get("search")?.trim();
  const category = searchParams.get("category");
  const where: WhereOptions = {};
  if (search) where.serviceName = { [Op.iLike]: `%${search}%` };
  if (category)
    where.categories = {
      [Op.contains]: [category],
    };
  return NextResponse.json({
    data: await Service.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email", "phoneNumber"],
          include: [{ model: SpecialistInfo, as: "specialistInfo" }],
        },
      ],
      where,
      order: [
        ["isVip", "DESC"],
        ["createdAt", order],
      ],
    }),
  });
};
