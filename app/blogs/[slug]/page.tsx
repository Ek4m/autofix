import { notFound } from "next/navigation";
import { Box, Container, Typography, Stack, Paper, Grid } from "@mui/material";

import AppImage from "@/components/ui/AppImage";
import { getBlog } from "@/modules/blogs/actions";
import { datePrettify } from "@/helpers/datePrettify";
import ShareButtons from "@/modules/blogs/components/share";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "sticky",
                top: 100,
                borderRadius: 4,
                overflow: "hidden",
                height: { xs: 280, md: 500 },
              }}
            >
              <AppImage src={blog.thumbnail} alt={blog.title} fill />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, fontSize: { xs: 30, md: 60 } }}
              >
                {blog.title}
              </Typography>

              <Typography variant="caption">
                {blog.brand.name} {blog.model.name}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                }}
              >
                {datePrettify(blog.createdAt, true)}
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  mt: 2,
                  p: { xs: 2, md: 4 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.9,
                    whiteSpace: "pre-line",
                    fontSize: 16,
                  }}
                >
                  {blog.description}
                </Typography>
              </Paper>

              <ShareButtons />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
