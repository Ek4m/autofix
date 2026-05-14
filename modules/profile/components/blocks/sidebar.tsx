"use client";
import SubmitButton from "@/components/ui/submitButton";
import { useAuth } from "@/modules/auth/contexts";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import {
  FiBriefcase,
  FiEdit2,
  FiLock,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTool,
  FiUser,
} from "react-icons/fi";
import { cardStyle, iconBoxStyle } from "../styles";
import { formatPhone } from "@/helpers/formatPhone";

const ProfileSidebar = () => {
  const { isMechanic, user, onLogout } = useAuth();
  const initials = useMemo(() => {
    return user?.fullName
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);
  return (
    <Grid size={{ xs: 12, xl: 3.5 }} component="aside">
      <Stack spacing={2.5}>
        <Paper sx={cardStyle}>
          <Box
            sx={{
              px: 3,
              py: 4,
              color: "white",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 88,
                height: 88,
                fontSize: 30,
                fontWeight: 700,
                bgcolor: "rgb(232, 93, 12)",
              }}
            >
              {initials}
            </Avatar>

            <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
              {user?.fullName}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.875rem",
                mt: 0.5,
              }}
            >
              {isMechanic ? "Peşəkar Mexanik" : "İstifadəçi"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
                mt: 2,
              }}
            >
              {isMechanic ? (
                <Chip
                  icon={<FiShield size={14} color="inherit" />}
                  label="Mexanik Hesabı"
                  color="success"
                  size="small"
                />
              ) : (
                <Chip
                  icon={<FiUser size={14} color="inherit" />}
                  label="Standart İstifadəçi"
                  color="primary"
                  size="medium"
                />
              )}{" "}
            </Box>
          </Box>

          <Box sx={{ p: 2.5 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
                <Box sx={{ ...iconBoxStyle, bgcolor: "var(--brand-muted)" }}>
                  <FiMail size={18} color="var(--brand-muted-fg)" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    Email
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      wordBreak: "break-all",
                    }}
                  >
                    {user?.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
                <Box sx={{ ...iconBoxStyle, bgcolor: "var(--brand-muted)" }}>
                  <FiPhone size={18} color="var(--brand-muted-fg)" />
                </Box>
                <Box>
                  <Typography sx={{ color: "text.secondary" }}>
                    Telefon
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {formatPhone(user?.phoneNumber)}
                  </Typography>
                </Box>
              </Box>

              {user?.specialistInfo?.city && (
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
                  <Box
                    sx={{
                      ...iconBoxStyle,
                      bgcolor: "var(--brand-muted)",
                    }}
                  >
                    <FiMapPin size={18} color="var(--brand-muted-fg)" />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "text.secondary",
                      }}
                    >
                      Şəhər
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {user?.specialistInfo?.city}
                    </Typography>
                  </Box>
                </Box>
              )}

              {user?.specialistInfo?.experienceYears ? (
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
                  <Box
                    sx={{
                      ...iconBoxStyle,
                      bgcolor: "var(--brand-muted)",
                    }}
                  >
                    <FiTool size={18} color="var(--brand-muted-fg)" />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "text.secondary",
                      }}
                    >
                      Təcrübə
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {user?.specialistInfo?.experienceYears} il
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </Stack>
          </Box>
        </Paper>

        {/* ACTIONS */}
        <Paper sx={{ ...cardStyle, p: 2 }}>
          <Typography sx={{ fontSize: "0.875rem", fontWeight: "bold", mb: 2 }}>
            Hesab Əməliyyatları
          </Typography>

          <Stack spacing={1.5}>
            <SubmitButton
              href="/profile/edit"
              startIcon={<FiEdit2 />}
              variant="outlined"
              color="primary"
              title="Profili Yenilə"
            />
            <SubmitButton
              href="/profile/reset-password"
              startIcon={<FiLock />}
              variant="outlined"
              color="primary"
              title="Şifrəni Sıfırla"
            />
            {!isMechanic && (
              <SubmitButton
                href="/profile/become-mechanic"
                startIcon={<FiBriefcase />}
                variant="outlined"
                color="primary"
                title="Mexanik Ol"
              />
            )}
            <SubmitButton
              startIcon={<FiLogOut />}
              onClick={onLogout}
              variant="text"
              color="error"
              title="Çıxış Et"
            />
          </Stack>
        </Paper>
      </Stack>
    </Grid>
  );
};

export default ProfileSidebar;
