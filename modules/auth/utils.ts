import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  // store salt + hash together
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
