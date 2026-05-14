import { setAuthCookie } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const POST = async () => {
  await setAuthCookie(null);
  return NextResponse.json(
    { data: { message: "Çıxış uğurlu oldu" } },
    { status: 200 },
  );
};
