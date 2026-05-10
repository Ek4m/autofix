import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { EntityType } from "@/constants/enums";
import { Problem, Upload } from "@/config/db";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const fileType = formData.get("fileType") as EntityType;
    const entityId: number = Number(formData.get("entityId"));
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 },
      );
    }
    const uploadedFiles: string[] = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
      uploadedFiles.push(fileName);
    }
    const [firstImage, ...restOfImages] = uploadedFiles;
    if (entityId) {
      switch (fileType) {
        case EntityType.PROBLEM:
          const problem = await Problem.findByPk(entityId);
          if (problem) {
            await Problem.update(
              { thumbnail: firstImage },
              {
                where: {
                  id: entityId,
                },
              },
            );
          }
          break;
      }
    }
    if (restOfImages.length) {
      await Upload.bulkCreate(
        restOfImages.map((img) => ({ name: img, entityId, type: fileType })),
      );
    }
    return NextResponse.json({
      success: true,
      data: uploadedFiles,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message || "Upload failed" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
};
