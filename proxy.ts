import { initDb } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export async function proxy() {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
}
export const config = {
  matcher: ["/api/issues/post"],
};
