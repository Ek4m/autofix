import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import { ACCESS_TOKEN, JWT_EXPIRES_IN, JWT_SECRET } from "./vault";
import { User } from "@/config/db";

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function comparePassword(
  password: string,
  storedPassword: string,
): Promise<boolean> {
  const [salt, key] = storedPassword.split(":");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const keyBuffer = Buffer.from(key, "hex");
  return timingSafeEqual(keyBuffer, derivedKey);
}

export const getAuthUserFromRequest = async () => {
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get(ACCESS_TOKEN)?.value;
  if (!tokenFromCookie) return null;
  const token = tokenFromCookie.replace("Bearer ", "").trim();
  if (!token || !jwt.verify(token, JWT_SECRET)) return null;
  const payload = jwt.decode(token);
  if (!payload) return null;
  const userId =
    "id" in (payload as object) ? (payload as { id: number }).id : null;
  if (!userId) return null;
  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ["password"] },
  });
  if (!user) return null;
  return user.get();
};

export function generateToken(userId: number) {
  return jwt.sign(
    { id: userId }, // payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

export const setAuthCookie = async (token: string | null) => {
  const expires = 60 * 60 * 24 * 5;
  const cookieStore = await cookies();
  if (!token) {
    cookieStore.delete(ACCESS_TOKEN);
    return;
  }
  cookieStore.set(ACCESS_TOKEN, `Bearer ${token}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: expires, // default 15 min
  });
};
