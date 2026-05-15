"use client";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";

import { toast } from "sonner";
import { formatPhone } from "@/helpers/formatPhone";
import { useState } from "react";
import SubmitButton from "@/components/ui/submitButton";
import { useGetMechanicContactInfo } from "../hooks/useGetMechanicContactInfo";

type Props = {
  id: number;
};

const ContactModal = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useGetMechanicContactInfo(id, open);
  const formattedPhone = formatPhone(data?.phoneNumber);
  const copyPhone = () => {
    if (!formattedPhone) return;
    navigator.clipboard.writeText(formattedPhone);
    toast.success("Nömrə kopyalandı");
  };

  const copyAddress = () => {
    if (!data?.rawAddress) return;
    navigator.clipboard.writeText(data.rawAddress);
    toast.success("Ünvan kopyalandı");
  };

  return (
    <>
      <SubmitButton title="Əlaqə məlumatları" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        {/* HEADER */}
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          Əlaqə məlumatları
          <IconButton onClick={() => setOpen(false)}>
            <FaTimes />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {isFetching ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={2}>
              {/* PHONE */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <FaPhone />
                  <Box>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                      Telefon
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {formattedPhone || "Yoxdur"}
                    </Typography>
                  </Box>
                </Box>

                <IconButton onClick={copyPhone}>
                  <FaCopy />
                </IconButton>
              </Box>

              {/* ADDRESS */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <FaMapMarkerAlt />
                  <Box>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                      Ünvan
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {data?.rawAddress || "Yoxdur"}
                    </Typography>
                  </Box>
                </Box>

                <IconButton onClick={copyAddress}>
                  <FaCopy />
                </IconButton>
              </Box>

              {/* MAP BUTTON */}
              {data?.locationUrl && (
                <SubmitButton
                  variant="contained"
                  onClick={() => window.open(data.locationUrl, "_blank")}
                  title="Xəritədə aç"
                  endIcon={<FaExternalLinkAlt />}
                />
              )}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactModal;
