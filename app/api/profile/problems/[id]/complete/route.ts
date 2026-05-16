import { initDb, Problem } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { PROBLEM_STATUS } from "@/modules/problems/constants";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const payload = await params;
  const { id } = payload;
  const problem = await Problem.findByPk(id);
  if (!problem || problem.get().status !== PROBLEM_STATUS.ASSIGNED) {
    return NextResponse.json({ message: "Problem tapılmadı" }, { status: 404 });
  }
  await problem.update({ status: PROBLEM_STATUS.COMPLETED });
  return NextResponse.json({ data: { archived: id } });
};
