import { initDb, Offer, Problem, SpecialistInfo, User } from "@/config/db";
import { mailer } from "@/config/mailer";
import offerNotification from "@/config/mailer/templates/offerNotification";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) return NextResponse.json("Unauthorized", { status: 401 });
  const body = await request.json();
  const problem = await Problem.findByPk(body.problemId, {
    include: [{ model: User, as: "user" }],
  });
  if (!problem)
    return NextResponse.json(
      { message: "Problem tapılmadı!" },
      { status: 400 },
    );
  const mechanicInfo = await SpecialistInfo.findOne({
    where: { userId: user?.id },
  });
  if (!mechanicInfo)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const alreadyOffered = await Offer.findOne({
    where: { problemId: body.problemId, userId: user.id },
  });
  if (alreadyOffered)
    return NextResponse.json(
      { message: "Siz artıq bu problem üçün təklif vermisiniz!" },
      {
        status: 400,
      },
    );
  const newOffer = await Offer.create({ ...body, userId: user?.id });
  const problemOwner = problem.get().user;
  if (problemOwner.email) {
    mailer.sendMail({
      to: problemOwner?.email,
      subject: "Yeni təklif",
      html: offerNotification(
        problemOwner.fullName.split(" ")[0],
        problem.get().title,
        user?.fullName || "",
        newOffer.get().maxPrice,
        newOffer.get().minPrice,
        body.problemId,
      ),
    });
  }
  return NextResponse.json({ data: newOffer });
};
