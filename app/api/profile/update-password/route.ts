import { initDb, User } from "@/config/db";
import {
  comparePassword,
  getAuthUserFromRequest,
  hashPassword,
} from "@/modules/auth/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await initDb();
    const authUser = await getAuthUserFromRequest();
    if (!authUser)
      return NextResponse.json(
        {
          message: "İstifadəçi tapılmadı",
        },
        {
          status: 404,
        },
      );

    const user = await User.findByPk(authUser.id);
    const body = await req.json();

    const { oldPassword, newPassword } = body;

    if (!user) {
      return NextResponse.json(
        {
          message: "İstifadəçi tapılmadı",
        },
        {
          status: 404,
        },
      );
    }

    const isOldPasswordCorrect = await comparePassword(
      oldPassword,
      user.get().password,
    );

    if (!isOldPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Cari şifrə yanlışdır",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    user.set("password", hashedPassword);

    await user.save();

    return NextResponse.json(
      {
        data: { success: true },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server xətası",
      },
      {
        status: 500,
      },
    );
  }
}
