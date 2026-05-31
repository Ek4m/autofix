import { httpClient } from "@/config/httpClient";
import { ContactUsForm } from "./types/dtos";

export const sendContactMessage = async (
  body: ContactUsForm,
): Promise<{ message: string }> => {
  const response = await httpClient("/send-contact-message", {
    body: JSON.stringify(body),
    method: "POST",
  });
  return response;
};
