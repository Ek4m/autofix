import { Category, initDb, Problem, User } from "@/config/db";
import { ORDER_BY_CREATION } from "@/modules/problems/constants";
import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  await initDb();
  const category = Number(searchParams.get("category"));
  const city = searchParams.get("city");
  const isVip = Boolean(Number(searchParams.get("vip")));
  const search = String(searchParams.get("search")).trim();
  const order = searchParams.get("order") || ORDER_BY_CREATION.DESC;

  const where: WhereOptions = {};

  if (!isNaN(category) && category) where.categoryId = category;
  if (isVip) where.isVip = true;
  if (search) where.title = { [Op.iLike]: `%${search}%` };
  if (city) where.city = city;

  const problems = await Problem.findAll({
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      { model: Category, as: "category" },
    ],
    where,
    order: [
      ["isVip", "DESC"],
      ["createdAt", order],
    ],
  });
  return NextResponse.json({ data: problems });
};
