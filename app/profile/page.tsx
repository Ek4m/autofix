import { Box, Container, Grid } from "@mui/material";

import Topbar from "@/components/Topbar";
import ProfileSidebar from "@/modules/profile/components/blocks/sidebar";
import ProfileMainContent from "@/modules/profile/components/blocks/content";

export default function ProfilePage() {
  return (
    <Box className="min-h-screen bg-brand-bg">
      <Topbar />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <ProfileSidebar />
          <ProfileMainContent />
        </Grid>
      </Container>
    </Box>
  );
}
