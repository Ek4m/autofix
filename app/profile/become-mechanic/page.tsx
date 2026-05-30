"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FiCheckCircle, FiShield, FiTool } from "react-icons/fi";
import { ImLocation } from "react-icons/im";

import cityList from "@/data/cities.json";
import categoriesList from "@/data/categories.json";

import TextField from "@/components/ui/textField";
import SelectField from "@/components/ui/selectField";
import SelectWithSearch from "@/components/ui/selectWithSearch";

import SubmitButton from "@/components/ui/submitButton";
import { MechanicForm } from "@/modules/auth/types/dtos";
import { mechanicFormSchema } from "@/modules/profile/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { becomeMechanic } from "@/modules/profile/services";
import { toast } from "sonner";
import { useAuth } from "@/modules/auth/contexts";
import { useRouter } from "next/navigation";

const BecomeMechanicPage = () => {
  const { getUserInfo } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<MechanicForm>({
    resolver: yupResolver(mechanicFormSchema),
    defaultValues: {
      objectName: "",
      profession: [],
      city: "",
      experienceYears: "",
      rawAddress: "",
      locationUrl: "",
      bio: "",
    },
  });

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

  const onSubmit = async (values: MechanicForm) => {
    try {
      const response = await becomeMechanic(values);
      toast.success(response.message);
      await getUserInfo();
      router.replace("/profile");
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
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
        }}
      >
        <Stack spacing={4}>
          {/* HERO */}
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: "32px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Grid container spacing={0}>
              <Grid
                size={{
                  xs: 12,
                  md: 7,
                }}
              >
                <Box
                  sx={{
                    p: {
                      xs: 4,
                      md: 6,
                    },
                  }}
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.2,
                        }}
                      >
                        Autofix-də mexanik ol
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          opacity: 0.9,
                          maxWidth: 600,
                          lineHeight: 1.8,
                        }}
                      >
                        Xidmətlərini paylaş, yeni müştərilər tap və platformada
                        öz qarajını tanıt.
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      {[
                        "Müştərilərdən birbaşa təkliflər al",
                        "Xidmətlərini və qiymətlərini paylaş",
                        "Reytinq və rəylərlə etibar qazan",
                      ].map((item) => (
                        <Stack
                          key={item}
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: "center" }}
                        >
                          <FiCheckCircle size={18} />

                          <Typography variant="body1">{item}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 5,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    p: {
                      xs: 4,
                      md: 5,
                    },
                    bgcolor: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    borderLeft: {
                      xs: "none",
                      md: "1px solid rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        Nə lazımdır?
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.85,
                          lineHeight: 1.7,
                        }}
                      >
                        Qısa məlumat dolduraraq mexanik hesabına keçid edə
                        bilərsiniz.
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      {[
                        {
                          icon: <FiTool size={18} />,
                          title: "İxtisas seçimi",
                        },
                        {
                          icon: <FiShield size={18} />,
                          title: "Əlaqə və ünvan məlumatı",
                        },
                        {
                          icon: <FiCheckCircle size={18} />,
                          title: "Servis haqqında bio",
                        },
                      ].map((item) => (
                        <Stack
                          key={item.title}
                          direction="row"
                          spacing={2}
                          sx={{ alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "14px",
                              bgcolor: "rgba(255,255,255,0.12)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* INFO */}
          <Alert
            severity="warning"
            sx={{
              borderRadius: "18px",
            }}
          >
            Profil məlumatlarınız müştərilərə göstəriləcək. Telefon nömrəniz
            yalnız əlaqə mərhələsində paylaşılır.
          </Alert>

          {/* FORM */}
          <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
              borderRadius: "28px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Mexanik məlumatları
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Profilinizi yaratmaq üçün aşağıdakı məlumatları doldurun.
                </Typography>
              </Box>

              <Divider />

              <Grid container spacing={3}>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Controller
                    name="objectName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Qarajın adı"
                        placeholder="Tex Avto Servis"
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <SelectField
                        {...field}
                        options={cityList.map((c) => ({
                          label: c.name,
                          value: c.id.toString(),
                        }))}
                        label="Şəhər"
                        placeholder="Şəhər seçin"
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Controller
                    name="profession"
                    control={control}
                    render={({ field, fieldState }) => (
                      <SelectWithSearch
                        {...field}
                        options={categories.map((c) => ({
                          label: c.name,
                          value: c.id,
                        }))}
                        label="İxtisaslar"
                        placeholder="İxtisas seçin"
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Controller
                    name="experienceYears"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="number"
                        fullWidth
                        label="Təcrübə ili"
                        placeholder="5"
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Controller
                    name="rawAddress"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Ünvan"
                        placeholder="Bakı, Nərimanov..."
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Controller
                    name="locationUrl"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Məkan linki"
                        placeholder="Google Maps linki"
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                        slotProps={{
                          input: {
                            endAdornment: <ImLocation />,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        multiline
                        minRows={5}
                        maxRows={10}
                        fullWidth
                        label="Ətraflı məlumat"
                        placeholder="Servisiniz, xidmətləriniz və təcrübəniz haqqında məlumat yazın..."
                        hasError={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                sx={{
                  justifyContent: "flex-end",
                }}
                spacing={2}
              >
                <SubmitButton
                  component={Link}
                  href="/profile"
                  variant="outlined"
                  title="Ləğv et"
                />
                <SubmitButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  title="Mexanik hesabına keç"
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default BecomeMechanicPage;
