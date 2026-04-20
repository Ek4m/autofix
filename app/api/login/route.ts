import { initDb } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await initDb();
    const { email, password } = await request.json();
    console.log(email, password);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
