import { API_URL } from "@/constants/enums";

export const makeImagePath = (fileId?: string) =>
  `${API_URL}/public/uploads/${fileId}`;
