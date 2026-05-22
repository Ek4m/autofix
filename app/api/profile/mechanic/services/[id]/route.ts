import { initDb, Service } from "@/config/db";
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
  const service = await Service.findOne({ where: { id, userId: user.id } });
  if (!service) {
    return NextResponse.json({ message: "Servis tapılmadı" }, { status: 404 });
  }
  await service.destroy();
  return NextResponse.json({ message: "Servis silindi" }, { status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const service = await Service.findOne({ where: { id, userId: user.id } });
  if (!service) {
    return NextResponse.json({ message: "Servis tapılmadı" }, { status: 404 });
  }
  const body = await request.json();
  await service.update(body);
  return NextResponse.json({ data: { message: "Servis uğurla dəyişdirildi" } });
};
