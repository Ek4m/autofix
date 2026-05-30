import { initDb, Service } from "@/config/db";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const payload = await params;
  const { id } = payload;
  const service = await Service.findOne({ where: { id, userId: user.id } });
  if (!service)
    return NextResponse.json({ message: "Servis tapılmadı" }, { status: 404 });
  await service.update({ isActive: !service.get().isActive });
  return NextResponse.json({
    data: {
      message: `Servisin statusu dəyişdirildi. Artıq ${service.get().isActive ? "aktivdir" : "aktiv deyil"}`,
    },
  });
};
