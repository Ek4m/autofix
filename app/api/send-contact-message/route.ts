import { ContactMessage, initDb } from "@/config/db";
import { mailer } from "@/config/mailer";
import contactMessage from "@/config/mailer/templates/contactMessage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await initDb();
  const body = await request.json();
  await ContactMessage.create(body);
  await mailer.sendMail({
    to: "salmanov.elvin.999@gmail.com",
    subject: "1 Əlaqə mesajı var (Avtofix)",
    html: contactMessage(body),
  });
  return NextResponse.json({
    data: {
      message:
        "Mesajınız uğurla göndərildi. Fikirləriniz bizim üçün dəyərlidir",
    },
  });
};
