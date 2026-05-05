import { initDb, Upload } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const searchParams = request.nextUrl.searchParams;
  const payload = await params;
  console.log(payload);
  const { id } = payload;
  const type = searchParams.get("type");
  const images = await Upload.findAll({ where: { entityId: id, type } });
  return NextResponse.json({ data: images });
};
