import { initDb, SpecialistInfo, User } from "@/config/db";
import { hashPassword } from "@/modules/auth/utils";
import { USER_ROLES } from "@/modules/auth/vault";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await initDb();
  const { mechanic, ...userData } = await req.json();
  const existingUser = await User.findOne({
    where: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }],
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "İstifadəçi artıq mövcuddur" },
      { status: 400 },
    );
  }

  const newPassword = await hashPassword(userData.password);

  const newUser = await User.create({
    ...userData,
    role: USER_ROLES.BASIC,
    password: newPassword,
  });
  if (mechanic) {
    await SpecialistInfo.create({
      ...mechanic,
      userId: newUser.get().id,
    });
  }
  return NextResponse.json(true);
};
