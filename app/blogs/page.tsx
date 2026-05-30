import { Box, Container, Grid, Typography } from "@mui/material";

import Topbar from "@/components/Topbar";
import { blogs } from "@/modules/blogs/mockData";
import BlogCard from "@/modules/blogs/components/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faydalı məlumatlar | AvtoFix",
  description:
    "Avtomobil baxımı, texniki problemlər və mexanik tövsiyələri barədə faydalı məqalələr.",
};

export default function BlogsPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Topbar />

      {/* HERO */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container sx={{ py: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              color: "orangered",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 2,
            }}
          >
            AutoFix Blog
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1.1,
            }}
          >
            Faydalı
            <Box component="span" sx={{ color: "orangered", display: "block" }}>
              məlumatlar
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,
              color: "text.secondary",
              maxWidth: 700,
              lineHeight: 1.8,
            }}
          >
            Avtomobil baxımı, texniki problemlər və mexanik tövsiyələri barədə
            faydalı məqalələr.
          </Typography>
        </Container>
      </Box>

      {/* BLOG GRID */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid key={blog.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
