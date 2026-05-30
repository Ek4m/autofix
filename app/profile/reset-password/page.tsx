"use client";
import React from "react";

import { Alert, Box, Container, Paper, Stack, Typography } from "@mui/material";

import { FiCheckCircle, FiSave, FiShield } from "react-icons/fi";

import { Controller, useForm } from "react-hook-form";
import PasswordField from "@/components/ui/passwordField";
import { cardStyle } from "@/modules/profile/components/styles";
import SubmitButton from "@/components/ui/submitButton";
import { UpdatePasswordForm } from "@/modules/profile/types/dtos";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePasswordSchema } from "@/modules/profile/schemas";
import { updatePasswordService } from "@/modules/profile/services";
import { toast } from "sonner";

export default function UpdatePasswordPage() {
  const formMethods = useForm<UpdatePasswordForm>({
    resolver: yupResolver(updatePasswordSchema),
  });

  const { control } = formMethods;

  const handleSubmit = async (data: UpdatePasswordForm) => {
    try {
      await updatePasswordService(data);
      toast.success("Şifrəniz uğurla dəyişdirildi!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 5,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Şifrəni Dəyiş
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Hesabınızın təhlükəsizliyi üçün yeni şifrə təyin edin
          </Typography>
        </Box>

        <Paper elevation={0} sx={cardStyle}>
          {/* HEADER */}
          <Box
            sx={{
              px: 5,
              py: 5,
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "20px",
                  backgroundColor: "rgb(255, 218, 148)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                <FiShield size={30} color="rgba(189, 119, 7, 0.72)" />
              </Box>

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Təhlükəsizlik Ayarları
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.85,
                    mt: 0.5,
                  }}
                >
                  Güclü şifrə hesabınızı qoruyur
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* FORM */}
          <Box sx={{ p: 5 }}>
            <form
              {...formMethods}
              onSubmit={formMethods.handleSubmit(handleSubmit)}
            >
              <Stack spacing={4}>
                <Alert
                  severity="warning"
                  sx={{
                    borderRadius: "16px",
                  }}
                >
                  Şifrəniz minimum 8 simvol olmalı və təhlükəsizlik üçün hərf və
                  rəqəmlərdən ibarət olmalıdır.
                </Alert>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <PasswordField
                      {...field}
                      hasError={Boolean(fieldState.error)}
                      label={"Cari şifrə"}
                      helperText={fieldState.error?.message}
                      placeholder="Tex avto servis"
                    />
                  )}
                />
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <PasswordField
                      {...field}
                      hasError={Boolean(fieldState.error)}
                      label={"Yeni şifrə"}
                      helperText={fieldState.error?.message}
                      placeholder="Tex avto servis"
                    />
                  )}
                />
                <Controller
                  name="newPasswordRetyped"
                  control={control}
                  render={({ field, fieldState }) => (
                    <PasswordField
                      {...field}
                      hasError={Boolean(fieldState.error)}
                      label={"Yeni şifrəni təsdiqlə"}
                      helperText={fieldState.error?.message}
                      placeholder="Tex avto servis"
                    />
                  )}
                />
                {/* ŞİFRƏ QAYDALARI */}
                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: "18px",
                    p: 3,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Təhlükəsiz Şifrə Üçün
                  </Typography>

                  <Stack spacing={1.5}>
                    {[
                      "Minimum 8 simvol istifadə edin",
                      "Böyük və kiçik hərflərdən istifadə edin",
                      "Ən azı 1 rəqəm əlavə edin",
                      "Xüsusi simvollardan istifadə edin",
                    ].map((item) => (
                      <Stack
                        key={item}
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: 25,
                            height: 25,
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 162, 0, 0.39)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#8f5300",
                            flexShrink: 0,
                          }}
                        >
                          <FiCheckCircle size={15} />
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>

                {/* BUTTONS */}
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  sx={{ justifyContent: "flex-end" }}
                  spacing={2}
                >
                  <SubmitButton
                    variant="outlined"
                    href="/profile"
                    title="Ləğv Et"
                    type="reset"
                  />
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    startIcon={<FiSave />}
                    title="Təsdiqlə"
                  />
                </Stack>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
