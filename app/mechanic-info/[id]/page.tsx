import Topbar from "@/components/Topbar";
import MechanicDetails from "@/modules/mechanic/components/details";
import { Box } from "@mui/material";
import React from "react";

const MechanicInfoPage = () => {
  return (
    <Box>
      <Topbar />
      <MechanicDetails  />
    </Box>
  );
};

export default MechanicInfoPage;
