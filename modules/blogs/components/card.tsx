import Link from "next/link";
import React, { FC } from "react";
import { Blog } from "../types/interfaces";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppImage from "@/components/ui/AppImage";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
  const blogDescription =
    blog.smallDescription.length >= 50
      ? blog.smallDescription.slice(0, 47) + "..."
      : blog.smallDescription;
  return (
    <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
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
        <Stack
          spacing={1.5}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: 200,
            justifyContent: "space-between",
          }}
        >
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
            {blogDescription}
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
  );
};

export default BlogCard;
