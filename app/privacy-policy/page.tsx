import { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import Topbar from "@/components/Topbar";
import SubmitButton from "@/components/ui/submitButton";

export const metadata: Metadata = {
  title: "Məxfilik Siyasəti | AvtoFix",
  description:
    "AvtoFix platformasının məxfilik siyasəti və istifadəçi məlumatlarının qorunması qaydaları.",
};

const sections = [
  {
    title: "1. Giriş",
    content:
      "AutoFix istifadəçilərlə mexanikləri bir araya gətirən platformadır. İstifadəçilər avtomobil problemlərini paylaşır, mexaniklər isə həmin problemlərə həll təklifləri təqdim edirlər. Platformadan istifadə etməklə bu siyasətlə razılaşmış hesab olunursunuz.",
  },
  {
    title: "2. Toplanan Məlumatlar",
    content:
      "Platformadan istifadə zamanı ad və soyad, e-poçt ünvanı, telefon nömrəsi, profil şəkli, avtomobil məlumatları, problem təsviri, şəkillər və mexanik məlumatları toplana bilər.",
  },
  {
    title: "3. Məlumatların İstifadə Məqsədi",
    content:
      "Toplanan məlumatlar hesabların idarə olunması, problemlərin paylaşılması, mexanik təkliflərinin təqdim edilməsi, reytinq sistemi və platforma təhlükəsizliyinin təmin olunması məqsədilə istifadə olunur.",
  },
  {
    title: "4. Əlaqə Məlumatlarının Gizliliyi",
    content:
      "Mexaniklərin əlaqə məlumatları platformada birbaşa açıq şəkildə göstərilmir. İstifadəçi mexaniklə davam etmək qərarı verdikdə əlavə əlaqə sorğusu göndərilə bilər. Qeydiyyatdan keçməmiş istifadəçilər mexaniklərin əlaqə məlumatlarını görə bilməzlər.",
  },
  {
    title: "5. Reytinqlər və Rəylər",
    content:
      "İstifadəçilər tamamlanmış xidmətlərdən sonra mexaniklərə reytinq və rəy verə bilərlər. Bu rəylər digər istifadəçilərə göstərilə bilər.",
  },
  {
    title: "6. Məlumatların Qorunması",
    content:
      "AutoFix istifadəçi məlumatlarının qorunması üçün təhlükəsizlik tədbirləri tətbiq edir. Buna baxmayaraq internet üzərindən ötürülən məlumatların tam təhlükəsizliyinə zəmanət verilmir.",
  },
  {
    title: "7. Üçüncü Tərəflər",
    content:
      "İstifadəçi məlumatları qanunvericiliyin tələb etdiyi hallar və platformanın işləməsi üçün zəruri texniki xidmətlər istisna olmaqla üçüncü tərəflərlə paylaşılmır.",
  },
  {
    title: "8. Hesabın Silinməsi",
    content:
      "İstifadəçilər istənilən vaxt hesablarının silinməsini tələb edə bilərlər. Bəzi məlumatlar hüquqi və təhlükəsizlik səbəbləri ilə müəyyən müddət saxlanıla bilər.",
  },
  {
    title: "9. Siyasətdə Dəyişikliklər",
    content:
      "AutoFix bu Məxfilik Siyasətini istənilən vaxt yeniləmək hüququnu özündə saxlayır.",
  },
];

export default function PrivacyPolicyPage() {
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
            Məxfilik
            <Box
              component="span"
              sx={{
                display: "block",
                color: "orangered",
              }}
            >
              siyasəti
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
            Bu səhifə AutoFix platformasında məlumatlarınızın necə toplandığını,
            istifadə olunduğunu və qorunduğunu izah edir.
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
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "32px",
            overflow: "hidden",
          }}
        >
          <Stack>
            {sections.map((section, index) => (
              <Box
                key={index}
                sx={{
                  p: {
                    xs: 3,
                    md: 5,
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  {section.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 2,
                    fontSize: 16,
                  }}
                >
                  {section.content}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: {
              xs: 4,
              md: 6,
            },
            borderRadius: "32px",
            textAlign: "center",
            bgcolor: "grey.900",
            color: "common.white",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Suallarınız var?
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "grey.400",
              lineHeight: 1.9,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Məxfilik siyasəti və ya məlumat təhlükəsizliyi ilə bağlı bizimlə
            əlaqə saxlaya bilərsiniz.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mt: 4,
              justifyContent: "center",
            }}
          >
            <Link href="/contact">
              <SubmitButton
                variant="contained"
                color="warning"
                title="Bizimlə əlaqə"
              />
            </Link>

            <Link href="/">
              <SubmitButton variant="text" title="Ana səhifəyə qayıt" />
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
