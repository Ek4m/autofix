import { unlink } from "fs/promises";
import path from "path";

export const removeFile = async (fileName: string) => {
  const filePath = path.join(process.cwd(), "public/uploads", fileName);
  try {
    await unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete file ${fileName}:`, error);
  }
};
