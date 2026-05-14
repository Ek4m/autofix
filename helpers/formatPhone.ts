import parsePhoneNumber from "libphonenumber-js";

export const formatPhone = (phone?: string) => {
  if (!phone) return "";
  return parsePhoneNumber(
    (phone.startsWith("+") ? "" : "+") + phone,
  )?.formatInternational();
};
