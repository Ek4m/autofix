import { initDb, MechanicReview, SpecialistInfo, User } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { col, fn } from "sequelize";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await initDb();
  const { id } = await params;
  const user = await User.findByPk(id, {
    include: [
      {
        model: SpecialistInfo,
        as: "specialistInfo",
        attributes: { exclude: ["rawAddress", "locationUrl"] },
      },
    ],
    attributes: { exclude: ["password", "phoneNumber", "email"] },
  });
  const reviewsStats = await MechanicReview.findOne({
    where: {
      mechanicId: id,
    },

    attributes: [
      [
        fn("COALESCE", fn("ROUND", fn("AVG", col("rating")), 1), 0),
        "avgRating",
      ],

      [fn("COUNT", col("id")), "reviewsCount"],
    ],

    raw: true,
  });
  console.log("____________________________", reviewsStats);
  if (!user || !("specialistInfo" in user) || !user.specialistInfo)
    return NextResponse.json({ message: "Tapılmadı" }, { status: 404 });

  return NextResponse.json({
    data: {
      ...user.get(),
      rating: {
        avgRating: reviewsStats?.avgRating,
        reviewsCount: reviewsStats?.reviewsCount,
      },
    },
  });
};
