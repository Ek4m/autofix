import { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import SubmitButton from "@/components/ui/submitButton";

export const metadata: Metadata = {
  title: "İstifadə Şərtləri | AvtoFix",
  description: "AvtoFix platformasının istifadə qaydaları və şərtləri.",
};

const sections = [
  {
    title: "1. Ümumi Məlumat",
    content:
      "AvtoFix sürücülərlə mexanikləri bir araya gətirən onlayn platformadır. Platformadan istifadə etməklə aşağıdakı istifadə şərtləri ilə razılaşmış hesab olunursunuz.",
  },
  {
    title: "2. Hesab Qeydiyyatı",
    content:
      "İstifadəçilər platformada qeydiyyatdan keçərkən doğru və aktual məlumat təqdim etməlidirlər. Hesab təhlükəsizliyinə görə istifadəçi özü məsuliyyət daşıyır.",
  },
  {
    title: "3. Problem Paylaşımı",
    content:
      "İstifadəçilər paylaşdıqları avtomobil problemlərinə görə məsuliyyət daşıyırlar. Yanlış, saxta və ya qeyri-qanuni məzmun paylaşılması qadağandır.",
  },
  {
    title: "4. Mexanik Təklifləri",
    content:
      "Mexaniklər istifadəçilərin problemlərinə qiymət, müddət və həll təklifləri göndərə bilərlər. Göndərilən təkliflərin düzgünlüyünə və icrasına görə mexanik özü məsuliyyət daşıyır.",
  },
  {
    title: "5. Əlaqə Məlumatları",
    content:
      "Mexaniklərin əlaqə məlumatları platformada birbaşa göstərilmir. İstifadəçi müəyyən mexaniklə davam etmək qərarı verdikdə əlavə sorğu prosesi tətbiq oluna bilər.",
  },
  {
    title: "6. Qonaq İstifadəçilər",
    content:
      "Qeydiyyatdan keçməmiş istifadəçilər bəzi məlumatlara və funksiyalara məhdud giriş əldə edirlər. Əlaqə məlumatları yalnız qeydiyyatdan keçmiş istifadəçilər üçün əlçatandır.",
  },
  {
    title: "7. Reytinqlər və Rəylər",
    content:
      "Tamamlanmış xidmətlərdən sonra istifadəçilər mexaniklərə reytinq və rəy verə bilərlər. Təhqiredici, saxta və ya aldadıcı rəylər silinə bilər.",
  },
  {
    title: "8. Qadağan Olunan İstifadə",
    content:
      "Platformadan qeyri-qanuni fəaliyyətlər, saxta elanlar, spam, digər istifadəçilərin məlumatlarının icazəsiz paylaşılması və ya platformaya zərər verəcək məqsədlər üçün istifadə etmək qadağandır.",
  },
  {
    title: "9. Məsuliyyətin Məhdudlaşdırılması",
    content:
      "AvtoFix yalnız vasitəçi platforma rolunu daşıyır. Platforma istifadəçi və mexanik arasında yaranan xidmət keyfiyyəti, ödəniş və ya digər mübahisələrə görə birbaşa məsuliyyət daşımır.",
  },
  {
    title: "10. Hesabın Dayandırılması",
    content:
      "Platforma qaydalarını pozan istifadəçilərin hesabları xəbərdarlıq edilmədən müvəqqəti və ya tam bloklana bilər.",
  },
  {
    title: "11. Dəyişikliklər",
    content:
      "AvtoFix istifadə şərtlərini istənilən vaxt yeniləmək hüququnu özündə saxlayır. Yenilənmiş qaydalar platformada paylaşılacaq.",
  },
];

export default function TermsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
      }}
    >
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
            İstifadə
            <Box
              component="span"
              sx={{
                display: "block",
                color: "orangered",
              }}
            >
              şərtləri
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
            Bu səhifə AvtoFix platformasından istifadə zamanı tətbiq olunan
            qaydaları və istifadə şərtlərini izah edir.
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
            {sections.map((section) => (
              <Box
                key={section.title}
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
            AvtoFix ilə təhlükəsiz istifadə
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
            Platformadan istifadə etməklə istifadə şərtləri ilə razılaşmış hesab
            olunursunuz.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mt: 4,
              justifyContent: "center",
            }}
          >
            <Link href="/privacy-policy">
              <SubmitButton
                variant="contained"
                color="warning"
                title="Məxfilik siyasəti"
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
