"use client";

import { useCallback, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { toast } from "sonner";

const ShareButtons = () => {
  const [url] = useState(() => window.location.href);

  const onCopyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link kopyalandı!");
  }, [url]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ py: 3, alignItems: "center" }}
    >
      {/* Facebook */}
      <FacebookShareButton url={url} style={{ width: "100%" }}>
        <Button
          fullWidth
          startIcon={<FaFacebookF color="white" />}
          sx={{
            backgroundColor: "#1877F2",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#145dc2",
            },
            borderRadius: "10px",
            px: 3,
            py: 1,
          }}
        >
          Paylaş
        </Button>
      </FacebookShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton url={url} style={{ width: "100%" }}>
        <Button
          fullWidth
          startIcon={<FaWhatsapp color="white" />}
          sx={{
            backgroundColor: "#25D366",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1ea952",
            },
            borderRadius: "10px",
            px: 3,
            py: 1,
          }}
        >
          Paylaş
        </Button>
      </WhatsappShareButton>

      {/* Copy link */}
      <Box sx={{ width: "100%" }}>
        <Button
          fullWidth
          onClick={onCopyToClipboard}
          startIcon={<LuCopy />}
          sx={{
            backgroundColor: "#fff",
            color: "#111827",
            border: "1px solid #e5e7eb",
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          Linki kopyala
        </Button>
      </Box>
    </Stack>
  );
};

export default ShareButtons;
