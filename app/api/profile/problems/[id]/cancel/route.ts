import { initDb, Problem } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { PROBLEM_STATUS } from "@/modules/problems/constants";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const payload = await params;
  const { id } = payload;
  await Problem.update({ status: PROBLEM_STATUS.CANCELLED }, { where: { id } });
  return NextResponse.json({ data: { deleted: id } });
};
