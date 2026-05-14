import { writeFile } from "fs/promises";
import path from "path";

export default async function uploadFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);
  await writeFile(filePath, buffer);
  return fileName;
}
