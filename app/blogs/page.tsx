import Link from "next/link";
import { Box, Container, Grid, Paper, Typography, Stack } from "@mui/material";

import Topbar from "@/components/Topbar";
import AppImage from "@/components/ui/AppImage";
import { blogs } from "@/modules/blogs/mockData";

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
              <Link
                href={`/blogs/${blog.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* IMAGE */}
                  <Box sx={{ height: 200, position: "relative" }}>
                    <AppImage src={blog.thumbnail} alt={blog.title} fill />
                  </Box>

                  {/* CONTENT */}
                  <Stack spacing={1.5} sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      {blog.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.7,
                      }}
                    >
                      {blog.description}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.disabled",
                        mt: 1,
                      }}
                    >
                      {new Date(blog.createdAt).toLocaleDateString("az-AZ")}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
