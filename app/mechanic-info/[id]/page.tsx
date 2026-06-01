import MechanicDetails from "@/modules/mechanic/components/details";
import { getMechanicInfo } from "@/modules/mechanic/services";
import { Box } from "@mui/material";
import React, { use } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mechanic = await getMechanicInfo(id);

  if (!mechanic) {
    return {
      title: "Usta tapılmadı",
    };
  }

  return {
    title: `${mechanic.fullName} | AvtoFix Blog`,
    description: mechanic.specialistInfo?.bio,
  };
}

const MechanicInfoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const mechanicInfo = use(getMechanicInfo(id));
  return (
    <Box>
      <MechanicDetails data={mechanicInfo} />
    </Box>
  );
};

export default MechanicInfoPage;
