import { initDb, SpecialistInfo, User } from "@/config/db";
import uploadFile from "@/helpers/uploadFiles";
import { getAuthUserFromRequest } from "@/modules/auth/utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  await initDb();
  const user = await getAuthUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const mechanicInfo = await SpecialistInfo.findOne({
    where: { userId: user.id },
  });
  const formData = await request.formData();
  const fullName = (formData.get("fullName") || user.fullName) as string;
  const phoneNumber = (formData.get("phoneNumber") ||
    user.phoneNumber) as string;
  const email = (formData.get("email") || user.email) as string;
  const profilePicture = formData.get("image") as File;
  const updateBody: Record<string, string> = { fullName, phoneNumber, email };
  if (profilePicture) {
    const fileNames = await uploadFile(profilePicture);
    updateBody["profilePicture"] = fileNames;
  }
  await User.update(updateBody, { where: { id: user.id } });
  if (mechanicInfo) {
    let profession = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("mechanic[profession]"))
      .sort(([a], [b]) => {
        const indexA = Number(a.match(/\[(\d+)\]$/)?.[1] || 0);
        const indexB = Number(b.match(/\[(\d+)\]$/)?.[1] || 0);

        return indexA - indexB;
      })
      .map(([, value]) => Number(value));

    const mechanicValues = mechanicInfo.get();
    const city = (formData.get("mechanic[city]") ||
      mechanicValues?.city) as string;
    profession =
      profession && profession.length
        ? profession
        : (mechanicValues.profession as number[]);
    const objectName = (formData.get("mechanic[objectName]") ||
      mechanicValues?.objectName) as string;
    const experienceYears = (formData.get("mechanic[experienceYears]") ||
      mechanicValues?.experienceYears) as string;
    const rawAddress = (formData.get("mechanic[rawAddress]") ||
      mechanicValues?.rawAddress) as string;
    const locationUrl = (formData.get("mechanic[locationUrl]") ||
      mechanicValues?.locationUrl) as string;
    const bio = (formData.get("mechanic[bio]") || mechanicValues.bio) as string;
    await SpecialistInfo.update(
      {
        city,
        objectName,
        experienceYears,
        rawAddress,
        locationUrl,
        bio,
        profession,
      },
      { where: { userId: user.id } },
    );
  }

  return NextResponse.json({
    data: {
      success: true,
    },
  });
};
