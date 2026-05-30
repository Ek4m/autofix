import { CarBrand, CarModel, initDb, Problem, User } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const { id } = await params;
  const problem = await Problem.findByPk(id, {
    include: [
      { model: User, as: "user" },
      { model: CarBrand, as: "brand", attributes: ["id", "name"] },
      { model: CarModel, as: "model", attributes: ["id", "name"] },
    ],
  });
  return NextResponse.json({ data: problem });
};
