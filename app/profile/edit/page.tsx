"use client";

import React, { useEffect, useMemo } from "react";

import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FiCamera, FiCheck, FiSave, FiTool, FiUser } from "react-icons/fi";
import { ImLocation } from "react-icons/im";

import CitySelectField from "@/components/ui/citySelectField";
import TextField from "@/components/ui/textField";
import SelectWithSearch from "@/components/ui/selectWithSearch";
import PhoneField from "@/components/ui/phoneField";
import SubmitButton from "@/components/ui/submitButton";

import { useAuth } from "@/modules/auth/contexts";
import categoriesList from "@/data/categories.json";
import { cardStyle } from "@/modules/profile/components/styles";
import { EditProfileForm } from "@/modules/profile/types/dtos";
import FilePicker from "@/components/ui/filePicker";
import objectToFormData from "@/helpers/objectToFormData";
import { editProfileService } from "@/modules/profile/services";
import { toast } from "sonner";
import { makeImagePath } from "@/helpers/fileOps";

export default function UpdateProfilePage() {
  const { user, isMechanic, getUserInfo } = useAuth();
  const tAuth = useTranslations("auth");
  const formMethods = useForm<EditProfileForm>({});
  const { control, reset, setValue, watch } = formMethods;

  const values = watch();
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        mechanic: user.specialistInfo
          ? {
              objectName: user.specialistInfo?.objectName || "",
              city: user.specialistInfo?.city || "",
              profession: user.specialistInfo?.profession,
              experienceYears: user.specialistInfo.experienceYears || "",
              rawAddress: user.specialistInfo?.rawAddress || "",
              locationUrl: user.specialistInfo?.locationUrl || "",
              bio: user.specialistInfo?.bio || "",
            }
          : null,
      });
    }
  }, [user, reset]);

  const handleEdit = async (data: EditProfileForm) => {
    try {
      const formData = objectToFormData(data);
      await editProfileService(formData);
      toast.success("Hesab məlumatlarınız uğurla yeniləndi.");
      await getUserInfo();
    } catch (error) {
      console.log(error);
      toast.error("Xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.");
    }
  };

  const categories = useMemo(
    () =>
      categoriesList.flatMap((cat) =>
        cat.subcategories.map((c) => ({
          ...c,
          name: `${cat.name} / ${c.name}`,
        })),
      ),
    [],
  );

  const initials = useMemo(() => {
    return (
      user?.fullName
        ?.split(" ")
        ?.map((x) => x[0])
        ?.join("")
        ?.slice(0, 2)
        ?.toUpperCase() || ""
    );
  }, [user]);

  const cardSx = {
    borderRadius: "24px",
    border: "1px solid var(--border)",
    boxShadow: "none",
    backgroundColor: "#fff",
  };

  return (
    <form
      {...formMethods}
      onSubmit={formMethods.handleSubmit(handleEdit)}
      className="space-y-4 animate-fade-in"
    >
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "var(--bg)",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
          }}
        >
          <Stack
            direction="row"
            sx={{
              mb: 2,
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Hesab məlumatlarını yenilə
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            {/* SOL */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3} sx={cardStyle}>
                {/* AVATAR */}
                <Paper
                  elevation={0}
                  sx={{
                    ...cardSx,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      px: 4,
                      py: 5,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "fit-content",
                        mx: "auto",
                      }}
                    >
                      <Avatar
                        src={
                          values.image
                            ? URL.createObjectURL(values.image)
                            : makeImagePath(user?.profilePicture)
                        }
                        sx={{
                          width: 100,
                          height: 100,
                          fontSize: 34,
                          fontWeight: 700,
                          mx: "auto",
                        }}
                      >
                        {initials}
                      </Avatar>
                      <FilePicker onFileSelect={(f) => setValue("image", f)}>
                        <Button
                          size="small"
                          sx={{
                            minWidth: 0,
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            position: "absolute",
                            right: -8,
                            bottom: -4,
                            backgroundColor: "#fff",
                            color: "#111",
                            "&:hover": {
                              backgroundColor: "#f3f4f6",
                            },
                          }}
                        >
                          <FiCamera size={18} />
                        </Button>
                      </FilePicker>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.8,
                        mt: 0.5,
                      }}
                    >
                      {isMechanic ? "Peşəkar Mexanik" : "İstifadəçi"}
                    </Typography>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Hesab Statusu
                    </Typography>

                    <Stack spacing={1.5}>
                      <Paper
                        variant="outlined"
                        sx={{
                          borderRadius: "14px",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "12px",
                            backgroundColor: "rgba(16,185,129,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#059669",
                          }}
                        >
                          <FiCheck size={18} />
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            Hesab Aktivdir
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            Profiliniz aktiv vəziyyətdədir
                          </Typography>
                        </Box>
                      </Paper>
                    </Stack>
                  </Box>
                </Paper>
              </Stack>
            </Grid>

            {/* SAĞ */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={3}>
                {/* ŞƏXSİ MƏLUMATLAR */}
                <Paper
                  elevation={0}
                  sx={{
                    ...cardSx,
                    ...cardStyle,
                    p: 4,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mb: 4, alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "18px",
                        backgroundColor: "rgba(59,130,246,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary)",
                      }}
                    >
                      <FiUser size={24} />
                    </Box>

                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Şəxsi Məlumatlar
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Əsas hesab məlumatlarınızı yeniləyin
                      </Typography>
                    </Box>
                  </Stack>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            hasError={Boolean(fieldState.error)}
                            label={tAuth("fullname")}
                            helperText={fieldState.error?.message}
                            placeholder="Əli Həsənov"
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="email"
                            hasError={Boolean(fieldState.error)}
                            label={tAuth("email")}
                            helperText={fieldState.error?.message}
                            placeholder="sizin@email.az"
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field, fieldState }) => (
                          <PhoneField
                            {...field}
                            hasError={Boolean(fieldState.error)}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* MEXANİK MƏLUMATLARI */}
                {isMechanic && (
                  <Paper
                    elevation={0}
                    sx={{
                      ...cardSx,
                      ...cardStyle,
                      p: 4,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mb: 4, alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "18px",
                          backgroundColor: "rgba(16,185,129,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#059669",
                        }}
                      >
                        <FiTool size={24} />
                      </Box>

                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Mexanik Məlumatları
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Servis və peşəkar məlumatlar
                        </Typography>
                      </Box>
                    </Stack>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="mechanic.objectName"
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              hasError={Boolean(fieldState.error)}
                              label={"Qarajın adı"}
                              helperText={fieldState.error?.message}
                              placeholder="Tex avto servis"
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name={"mechanic.city"}
                          control={control}
                          render={({ field, fieldState }) => (
                            <CitySelectField
                              {...field}
                              hasError={Boolean(fieldState.error)}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Controller
                          name={"mechanic.profession"}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SelectWithSearch
                              {...field}
                              options={categories.map((c) => ({
                                label: c.name,
                                value: c.id,
                              }))}
                              hasError={Boolean(fieldState.error)}
                              label={tAuth("mechanic.specialization")}
                              helperText={fieldState.error?.message}
                              placeholder={tAuth("mechanic.specialization")}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Controller
                          name={"mechanic.experienceYears"}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              hasError={Boolean(fieldState.error)}
                              label={tAuth("mechanic.experience")}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Controller
                          name={"mechanic.rawAddress"}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              hasError={Boolean(fieldState.error)}
                              label="Ünvan"
                              multiline
                              rows={3}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Controller
                          name={"mechanic.locationUrl"}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              hasError={Boolean(fieldState.error)}
                              label="Məkan linki"
                              helperText={fieldState.error?.message}
                              slotProps={{
                                input: { endAdornment: <ImLocation /> },
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Controller
                          name="mechanic.bio"
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              multiline
                              rows={10}
                              hasError={Boolean(fieldState.error)}
                              label="Ətraflı"
                              helperText={fieldState.error?.message}
                              placeholder="İş yeriniz(brendiniz) haqqında məlumat..."
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={12}>
                        <SubmitButton
                          variant="contained"
                          title="Yadda Saxla"
                          type="submit"
                          startIcon={<FiSave />}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </form>
  );
}
