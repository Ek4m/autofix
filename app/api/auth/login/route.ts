import { initDb, User } from "@/config/db";
import { NextResponse } from "next/server";
import {
  comparePassword,
  generateToken,
  setAuthCookie,
} from "@/modules/auth/utils";

export async function POST(request: Request) {
  try {
    await initDb();
    const { email, password } = await request.json();
    const user = await User.findOne({
      where: { email },
    });
    if (!user)
      return NextResponse.json(
        { message: "İstifadəçi tapılmadı" },
        { status: 401 },
      );
    const isPasswordValid = await comparePassword(
      password,
      user.get().password,
    );
    if (!isPasswordValid)
      return NextResponse.json(
        { message: "İstifadəçi adı və ya parol səhvdir" },
        { status: 401 },
      );
    const token = generateToken(Number(user.get().id));
    await setAuthCookie(token);
    return NextResponse.json({ message: "Giriş uğurlu" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
