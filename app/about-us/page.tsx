import Link from "next/link";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Topbar from "@/components/Topbar";
import SubmitButton from "@/components/ui/submitButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haqqımızda | AvtoFix",
  description:
    "AvtoFix sürücülərlə peşəkar mexanikləri bir araya gətirən platformadır. İstifadəçilər avtomobil problemlərini paylaşır, mexaniklər isə öz təkliflərini təqdim edirlər.",
};

export default function AboutUsPage() {
  const values = [
    {
      title: "Şəffaflıq",
      description:
        "İstifadəçilər bütün təklifləri müqayisə edə, qiymətləri və mexanik reytinqlərini görə bilirlər.",
    },
    {
      title: "Sürət",
      description:
        "Probleminizi paylaşın və qısa müddətdə bir neçə mexanikdən təklif alın.",
    },
    {
      title: "Etibarlılıq",
      description:
        "Reytinq və rəy sistemi istifadəçilərin daha doğru seçim etməsinə kömək edir.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffff",
      }}
    >
      <Topbar />
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: {
              xs: 8,
              md: 14,
            },
          }}
        >
          <Grid container spacing={6} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderRadius: "999px",
                  color: "orangered",
                  fontWeight: 600,
                  fontSize: 14,
                  mb: 3,
                }}
              >
                AvtoFix haqqında
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.1,
                  fontSize: {
                    xs: "2.8rem",
                    md: "4.5rem",
                  },
                }}
              >
                Avtomobil problemlərini
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "orangered",
                  }}
                >
                  daha rahat həll edin
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: 700,
                }}
              >
                AvtoFix sürücülərlə peşəkar mexanikləri bir araya gətirən
                platformadır. İstifadəçilər avtomobil problemlərini paylaşır,
                mexaniklər isə öz təkliflərini təqdim edirlər.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 5 }}
              >
                <Link href="/problems/create">
                  <SubmitButton variant="contained" title="Problem paylaş" />
                </Link>
                <Link href="/services">
                  <SubmitButton variant="outlined" title="Xidmətlərə bax" />
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Grid container spacing={2.5}>
                <img
                  src={
                    "https://www.shutterstock.com/image-vector/mechanic-inspecting-car-engine-cartoon-600nw-2725968597.jpg"
                  }
                  alt="mechanic fixing car"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ABOUT */}
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 8,
            md: 14,
          },
        }}
      >
        <Grid container spacing={8} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography
              sx={{
                color: "orangered",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                mb: 2,
              }}
            >
              Missiyamız
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Sürücü ilə mexanik arasında körpü yaratmaq
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 4,
                lineHeight: 2,
                color: "text.secondary",
                fontSize: 17,
              }}
            >
              Azərbaycanda bir çox sürücü düzgün və etibarlı mexanik tapmaqda
              çətinlik çəkir. AvtoFix bu prosesi sadələşdirmək üçün yaradılıb.
              İstifadəçilər problemlərini paylaşır, mexaniklər isə qiymət,
              müddət və həll yolu ilə təklif göndərirlər.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                lineHeight: 2,
                color: "text.secondary",
                fontSize: 17,
              }}
            >
              Məqsədimiz avtomobil sahəsində daha şəffaf, sürətli və rahat
              xidmət ekosistemi yaratmaqdır.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "32px",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={3}>
                {values.map((value) => (
                  <Paper
                    key={value.title}
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "22px",
                      bgcolor: "action.hover",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {value.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1.5,
                        lineHeight: 1.9,
                        color: "text.secondary",
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* HOW IT WORKS */}
      <Box
        sx={{
          py: {
            xs: 8,
            md: 14,
          },
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: 700 }}>
            <Typography
              sx={{
                color: "orangered",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                mb: 2,
              }}
            >
              Necə işləyir?
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Sadə və rahat proses
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            {[
              {
                step: "01",
                title: "Problemi paylaş",
                description:
                  "Avtomobil problemini, şəkilləri və detalları əlavə edin.",
              },
              {
                step: "02",
                title: "Təklifləri müqayisə et",
                description:
                  "Mexaniklərdən gələn qiymət və həll təkliflərini dəyərləndirin.",
              },
              {
                step: "03",
                title: "Mexanik seç",
                description: "Uyğun mexaniki seçin və problemi həll edin.",
              },
            ].map((item) => (
              <Grid key={item.step} size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: "28px",
                    bgcolor: "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    sx={{
                      color: "orangered",
                      fontWeight: 800,
                    }}
                  >
                    {item.step}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      mt: 2,
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      lineHeight: 1.9,
                      color: "text.secondary",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 8,
            md: 14,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 4,
              md: 8,
            },
            borderRadius: "40px",
            textAlign: "center",
            bgcolor: "grey.900",
            color: "common.white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.15,
              fontSize: {
                xs: "2.4rem",
                md: "4rem",
              },
            }}
          >
            AvtoFix ilə daha sürətli həll tapın
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 3,
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.9,
              color: "grey.400",
              fontWeight: 400,
            }}
          >
            İstər sürücü olun, istər peşəkar mexanik — AvtoFix avtomobil
            problemlərini daha rahat idarə etməyə kömək edir.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 5, justifyContent: "center" }}
          >
            <Link href="/register">
              <SubmitButton
                variant="contained"
                color="warning"
                title="İndi başla"
              />
            </Link>
            <Link href="/contact">
              <SubmitButton variant="text" title="Bizimlə əlaqə" />
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
