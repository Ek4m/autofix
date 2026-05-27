import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "power.ai.app@gmail.com",
    pass: process.env.MAILER_PASS,
  },
});
