import { fn, col } from "sequelize";

import {
  initDb,
  MechanicReview,
  Offer,
  Service,
  SpecialistInfo,
} from "@/config/db";

import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { OFFER_STATUS } from "@/modules/problems/constants";

import { NextResponse } from "next/server";

export const GET = async () => {
  await initDb();

  const user = await getAuthUserFromRequest();

  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }

  const specialistInfo = await SpecialistInfo.findOne({
    where: { userId: user.id },
  });

  if (!specialistInfo) {
    return NextResponse.json({}, { status: 401 });
  }

  const allOffersCount = await Offer.count({
    where: { userId: user.id },
  });

  const acceptedOfferCount = await Offer.count({
    where: {
      userId: user.id,
      status: OFFER_STATUS.ACCEPTED,
    },
  });

  const servicesCount = await Service.count({
    where: {
      userId: user.id,
    },
  });

  const services = await Service.findAll({
    where: {
      userId: user.id,
    },
    limit: 3,
    order: [["createdAt", "DESC"]],
  });

  const offers = await Offer.findAll({
    where: {
      userId: user.id,
    },
    limit: 3,
    order: [["createdAt", "DESC"]],
  });

  const reviewsStats = await MechanicReview.findOne({
    where: {
      mechanicId: user.id,
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

  return NextResponse.json({
    data: {
      offerCounts: {
        allOffersCount,
        acceptedOfferCount,
      },

      servicesCount,

      rating: {
        avgRating: reviewsStats?.avgRating,
        reviewsCount: reviewsStats?.reviewsCount,
      },

      services,

      offers,
    },
  });
};
