import { NextRequest, NextResponse } from "next/server";

import {
  initDb,
  MechanicReview,
  Offer,
  Problem,
  SpecialistInfo,
  Upload,
  User,
} from "@/config/db";
import { EntityType } from "@/constants/enums";
import { col, fn } from "sequelize";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const payload = await params;
  const { id } = payload;
  const problem = await Problem.findByPk(id, {
    include: [{ model: User, as: "user" }],
  });
  if (!problem) return NextResponse.json({}, { status: 404 });
  const images = await Upload.findAll({
    where: { entityId: id, type: EntityType.PROBLEM },
  });
  const offers = await Offer.findAll({
    where: {
      problemId: id,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "phoneNumber", "email"],
          include: [
            [
              fn(
                "COALESCE",
                fn("ROUND", fn("AVG", col("user.receivedReviews.rating")), 1),
                0,
              ),
              "avgRating",
            ],

            [fn("COUNT", col("user.receivedReviews.id")), "reviewsCount"],
          ],
        },
        include: [
          {
            model: SpecialistInfo,
            as: "specialistInfo",
            attributes: ["id", "objectName"],
          },
          {
            model: MechanicReview,
            as: "receivedReviews",
            attributes: [],
          },
        ],
      },
    ],
    group: ["Offer.id", "user.id", "user->specialistInfo.id"],
  });
  return NextResponse.json({ data: { problem, offers, images } });
};
