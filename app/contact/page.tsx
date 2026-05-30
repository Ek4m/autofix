import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

import Topbar from "@/components/Topbar";
import ContactForm from "@/modules/contact/components/form";

export const metadata: Metadata = {
  title: "Əlaqə | AvtoFix",
  description: "AvtoFix ilə əlaqə saxlayın.",
};

export default function ContactPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
      }}
    >
      <Topbar />

      {/* HERO */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: {
              xs: 8,
              md: 12,
            },
          }}
        >
          <Typography
            sx={{
              color: "orangered",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 2,
            }}
          >
            AvtoFix
          </Typography>

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
            Bizimlə
            <Box
              component="span"
              sx={{
                display: "block",
                color: "orangered",
              }}
            >
              əlaqə saxlayın
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 3,
              color: "text.secondary",
              lineHeight: 1.8,
              fontWeight: 400,
              maxWidth: 800,
            }}
          >
            Suallarınız, təklifləriniz və ya problemləriniz varsa bizimlə əlaqə
            saxlaya bilərsiniz. Komandamız ən qısa zamanda sizə cavab verəcək.
          </Typography>
        </Container>
      </Box>

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 6,
            md: 10,
          },
        }}
      >
        <Grid container spacing={4}>
          {/* FORM */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "32px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                Mesaj göndər
              </Typography>

              <ContactForm />
            </Paper>
          </Grid>

          {/* INFO */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "32px",
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Əlaqə məlumatları
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>E-poçt</Typography>
                  <Typography color="text.secondary">
                    support@avtofix.az
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Telefon</Typography>
                  <Typography color="text.secondary">
                    +994 50 123 45 67
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: 600 }}>İş saatları</Typography>
                  <Typography color="text.secondary">
                    Bazar ertəsi - Cümə
                  </Typography>
                  <Typography color="text.secondary">09:00 - 18:00</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
