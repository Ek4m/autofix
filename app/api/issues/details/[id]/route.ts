import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";

import { initDb, Offer, SpecialistInfo, Upload, User } from "@/config/db";
import { EntityType } from "@/constants/enums";
import { OFFER_STATUS } from "@/modules/problems/constants";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const payload = await params;
  const { id } = payload;
  const images = await Upload.findAll({
    where: { entityId: id, type: EntityType.PROBLEM },
  });
  const offers = await Offer.findAll({
    where: {
      problemId: id,
      status: {
        [Op.not]: OFFER_STATUS.DECLINED,
      },
    },
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
