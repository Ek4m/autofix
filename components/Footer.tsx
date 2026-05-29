import Link from "next/link";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { FiInstagram, FiFacebook, FiMail, FiPhone } from "react-icons/fi";

const footerLinks = {
  platform: [
    {
      title: "Haqqımızda",
      href: "/about-us",
    },
    {
      title: "Xidmətlər",
      href: "/mechanic-service-listing",
    },
    {
      title: "Problemlər",
      href: "/problems",
    },
  ],
  legal: [
    {
      title: "Məxfilik siyasəti",
      href: "/privacy-policy",
    },
    {
      title: "İstifadə şərtləri",
      href: "/terms-conditions",
    },
  ],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "#000",
        color: "white",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Grid container spacing={6}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
              }}
            >
              AvtoFix
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "grey.400",
                lineHeight: 1.9,
                maxWidth: 500,
              }}
            >
              AvtoFix sürücülərlə peşəkar mexanikləri bir araya gətirən
              platformadır. Probleminizi paylaşın, təklifləri müqayisə edin və
              uyğun mexaniki seçin.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 3,
              }}
            >
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "white",
                }}
              >
                <FiInstagram size={18} />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "white",
                }}
              >
                <FiFacebook size={18} />
              </IconButton>
            </Stack>
          </Grid>

          {/* LINKS */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Platforma
            </Typography>

            <Stack spacing={1.5}>
              {footerLinks.platform.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "#9CA3AF",
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* LEGAL */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Hüquqi
            </Typography>

            <Stack spacing={1.5}>
              {footerLinks.legal.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "#9CA3AF",
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* CONTACT */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Əlaqə
            </Typography>

            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <FiMail size={18} />
                <Typography
                  sx={{
                    color: "grey.400",
                  }}
                >
                  support@avtofix.az
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <FiPhone size={18} />
                <Typography
                  sx={{
                    color: "grey.400",
                  }}
                >
                  +994 50 123 45 67
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 5,
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        {/* BOTTOM */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "grey.500",
              fontSize: 14,
            }}
          >
            © {new Date().getFullYear()} AvtoFix. Bütün hüquqlar qorunur.
          </Typography>

          <Typography
            sx={{
              color: "grey.500",
              fontSize: 14,
            }}
          >
            Azərbaycan üçün hazırlanıb 🇦🇿
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
