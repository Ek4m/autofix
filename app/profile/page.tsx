import { Box, Container, Grid } from "@mui/material";

import ProfileSidebar from "@/modules/profile/components/blocks/sidebar";
import ProfileMainContent from "@/modules/profile/components/blocks/content";

export default function ProfilePage() {
  return (
    <Box className="min-h-screen bg-brand-bg">
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <ProfileSidebar />
          <ProfileMainContent />
        </Grid>
      </Container>
    </Box>
  );
}
