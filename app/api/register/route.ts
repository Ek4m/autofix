import { AppDataSource, initDb } from "@/config/db";
import { SpecialistInfo } from "@/config/db/entities/SpecialistInfo";
import { User } from "@/config/db/entities/User";
import { hashPassword } from "@/modules/auth/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await initDb();
  const { mechanic, ...userData } = await req.json();
  const existingUser = await AppDataSource.getRepository(User).findOne({
    where: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }],
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "İstifadəçi artıq mövcuddur" },
      { status: 400 },
    );
  }

  const newPassword = await hashPassword(userData.password);

  const newUser = await AppDataSource.getRepository(User).save({
    ...userData,
    password: newPassword,
  });
  if (mechanic) {
    await AppDataSource.getRepository(SpecialistInfo).save({
      ...mechanic,
      user: newUser,
    });
  }
  return NextResponse.json(true);
};
