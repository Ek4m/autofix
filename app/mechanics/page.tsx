import MechanicList from "@/modules/mechanic/components/mechanicList";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mexaniklər | AvtoFix - Peşəkar Ustalar",
  description:
    "AvtoFix-də peşəkar avtomobil mexaniklərini kəşf edin. Reytinqlərə, təcrübəyə və xidmət sahəsinə görə ustaları müqayisə edin və ən uyğununu seçin.",
};

export default function MechanicsPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* HEADER */}
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "orangered",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Mexaniklər
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Peşəkar ustalar
          </Typography>

          <Typography sx={{ color: "text.secondary", maxWidth: 700 }}>
            Reytinq, təcrübə və xidmət sahəsinə görə mexanikləri seçin.
          </Typography>
        </Stack>
        <MechanicList />
      </Container>
    </Box>
  );
}
