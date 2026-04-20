import { AppDataSource, initDb } from "@/config/db";
import {} from "crypto";
import { User } from "@/config/db/entities/User";
import { NextResponse } from "next/server";
import { comparePassword } from "@/modules/auth/utils";

export async function POST(request: Request) {
  try {
    await initDb();
    const { email, password } = await request.json();
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });
    if (!user)
      return NextResponse.json(
        { message: "İstifadəçi tapılmadı" },
        { status: 401 },
      );
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        { message: "İstifadəçi adı və ya parol səhvdir" },
        { status: 401 },
      );
    return NextResponse.json({ message: "Giriş uğurlu" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
