import { initDb, Offer, SpecialistInfo, Upload, User } from "@/config/db";
import { UploadedFileType } from "@/constants/enums";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const payload = await params;
  const { id } = payload;
  const images = await Upload.findAll({
    where: { entityId: id, type: UploadedFileType.PROBLEM },
  });
  const offers = await Offer.findAll({
    where: { problemId: id },
    include: [
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password"],
          include: ["id"],
        },
        include: [
          {
            model: SpecialistInfo,
            as: "specialistInfo",
            attributes: { include: ["id", "objectName"] },
          },
        ],
      },
    ],
  });
  return NextResponse.json({ data: { offers, images } });
};
