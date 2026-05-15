import { Box } from "@mui/material";
import React, { FC } from "react";

const ProfilePhotoWithChar: FC<{ title: string }> = ({ title }) => {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        bgcolor: "lightgrey",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
      }}
    >
      {title
        .split(" ")
        .map((c) => c[0].toUpperCase())
        .join("")}
    </Box>
  );
};

export default ProfilePhotoWithChar;
