import { initDb, Offer } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const offer = await Offer.findOne({ where: { id, userId: user.id } });
  if (!offer) {
    return NextResponse.json({ message: "Təklif tapılmadı" }, { status: 404 });
  }
  await offer.destroy();
  return NextResponse.json(
    { data: { message: "Təklif silindi" } },
    { status: 200 },
  );
};
