import { Category, initDb, Problem, User } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { WhereOptions } from "sequelize";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  await initDb();
  const category = Number(searchParams.get("category"));
  const where: WhereOptions = {};
  if (!isNaN(category) && category) {
    where.categoryId = category;
  }
  const problems = await Problem.findAll({
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      { model: Category, as: "category" },
    ],
    where,
    order: [["isVip", "DESC"]],
  });
  return NextResponse.json({ data: problems });
};
