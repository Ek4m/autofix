"use client";
import Link from "next/link";
import { Divider, Paper, Stack, Typography, Box, Grid } from "@mui/material";
import { FiLock, FiShield, FiTool, FiUser } from "react-icons/fi";
import { useAuth } from "@/modules/auth/contexts";
import SubmitButton from "@/components/ui/submitButton";
import { cardStyle, iconBoxStyle } from "../styles";
import TextField from "@/components/ui/textField";

const ProfileMainContent = () => {
  const { isMechanic, user } = useAuth();

  return (
    <Grid size={{ xs: 12, xl: 8.5 }}>
      <Stack spacing={3}>
        {/* USER INFO */}
        <Paper sx={{ ...cardStyle, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Box
              sx={{
                ...iconBoxStyle,
                width: 48,
                height: 48,
                bgcolor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "16px",
              }}
            >
              <FiUser size={22} color="#3b82f6" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Şəxsi Məlumatlar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hesabınızın təfərrüatları
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                disabled
                label="Tam Ad"
                value={user?.fullName || ""}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                disabled
                label="Email"
                value={user?.email || ""}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                disabled
                label="Telefon Nömrəsi"
                value={user?.phoneNumber || ""}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                disabled
                label="Hesab Növü"
                value={isMechanic ? "Mexanik" : "İstifadəçi"}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>

        {/* MECHANIC INFO */}
        {user?.specialistInfo && (
          <Paper sx={{ ...cardStyle, p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <Box
                sx={{
                  ...iconBoxStyle,
                  width: 48,
                  height: 48,
                  bgcolor: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "16px",
                }}
              >
                <FiTool size={22} color="#059669" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Mexanik Məlumatları
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Peşəkar detallar
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled
                  label="Emalatxana Adı"
                  value={user?.specialistInfo?.objectName || ""}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled
                  label="Təcrübə"
                  value={`${user?.specialistInfo?.experienceYears} il`}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled
                  label="Şəhər"
                  value={user?.specialistInfo?.city || ""}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  disabled
                  label="Ünvan"
                  value={user?.specialistInfo?.rawAddress || ""}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Bioqrafiya"
                  value={user?.specialistInfo?.bio || ""}
                  fullWidth
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* SECURITY */}
        <Paper sx={{ ...cardStyle, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box
              sx={{
                ...iconBoxStyle,
                width: 48,
                height: 48,
                bgcolor: "rgba(245, 158, 11, 0.1)",
                borderRadius: "16px",
              }}
            >
              <FiShield size={22} color="#d97706" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Təhlükəsizlik
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hesabınızı qoruyun
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              gap: 2,
              mt: 3,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>
                Şifrə
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Daha yaxşı təhlükəsizlik üçün şifrənizi mütəmadi olaraq dəyişin.
              </Typography>
            </Box>
            <Link href="/profile/reset-password">
              <SubmitButton
                startIcon={<FiLock />}
                variant="contained"
                title="Şifrəni Sıfırla"
              />
            </Link>
          </Box>
        </Paper>
      </Stack>
    </Grid>
  );
};

export default ProfileMainContent;
