import { notFound } from "next/navigation";
import { Box, Container, Typography, Stack, Paper } from "@mui/material";

import AppImage from "@/components/ui/AppImage";
import { getBlog } from "@/modules/blogs/actions";
import { datePrettify } from "@/helpers/datePrettify";
import ShareButtons from "@/modules/blogs/components/share";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog tapılmadı",
    };
  }

  return {
    title: `${blog.title} | AvtoFix Blog`,
    description: blog.smallDescription,
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return notFound();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Box
        sx={{
          height: { xs: 220, md: 380 },
          position: "relative",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <AppImage src={blog.thumbnail} alt={blog.title} fill />
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack spacing={2}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
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
              mt: 3,
              p: { xs: 2, md: 4 },
              borderRadius: "24px",
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
      </Container>
    </Box>
  );
}
