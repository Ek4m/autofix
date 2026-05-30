"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiMapPin,
  FiClock,
  FiShield,
  FiMessageSquare,
  FiCheckCircle,
  FiSettings,
} from "react-icons/fi";

import { useGetServiceDetails } from "@/modules/services/hooks/useGetServiceDetails";

import ProfilePhotoWithChar from "@/components/ui/profilePhotoWithChar";
import SubmitButton from "@/components/ui/submitButton";

import { getCategoryTitle } from "@/helpers/getCategoryTitle";
import { datePrettify } from "@/helpers/datePrettify";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { getCityTitle } from "@/helpers/getCityTitle";
import { useAuth } from "@/modules/auth/contexts";
import AppModal from "@/components/ui/modal";
import { useMutation } from "@tanstack/react-query";
import { deleteService } from "@/modules/profile/services";
import { PostServiceModal } from "@/modules/services/components/post";

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: service } = useGetServiceDetails(id);
  const { user } = useAuth();
  const specialistInfo = service?.user.specialistInfo;
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const isMyService = user?.id === service?.userId;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const onDeleteService = useMutation({
    mutationFn: async () => {
      try {
        await deleteService(id);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const priceText = useMemo(() => {
    if (!service?.priceMin && !service?.priceMax) return "Qiymət razılaşma ilə";

    if (service.priceMin === service.priceMax) {
      return `${service.priceMin} ₼`;
    }

    return `${service.priceMin} ₼ - ${service.priceMax} ₼`;
  }, [service]);

  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <Grid container spacing={2}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Hero */}
            <Box
              sx={{ mb: 2 }}
              className={`card-surface overflow-hidden ${
                service?.isVip ? "premium-glow ring-amber-300/50" : ""
              }`}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-primary-DEFAULT via-primary-dark to-slate-900 px-6 py-8 sm:px-8">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {service?.isVip && (
                      <span className="badge-premium">⭐ VIP Xidmət</span>
                    )}
                    <Chip
                      icon={<FiCheckCircle size={12} />}
                      label="Aktiv"
                      color="success"
                    />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
                    {service?.serviceName}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
                    {specialistInfo?.city && (
                      <Chip
                        size="medium"
                        variant="outlined"
                        label={getCityTitle(specialistInfo.city)}
                        color="warning"
                        icon={<FiMapPin size={14} />}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <p className="text-sm text-brand-muted-fg mb-1.5">
                      Başlanğıc qiymət
                    </p>

                    <h2 className="text-3xl font-black text-primary-DEFAULT tabular-nums">
                      {priceText}
                    </h2>
                  </div>
                  <div>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <FiClock size={14} />
                      {service &&
                        new Date(service?.createdAt).toLocaleDateString(
                          "az-AZ",
                        )}
                    </Typography>
                  </div>
                </div>
              </div>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 2 }} className="card-surface p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary-DEFAULT/10 flex items-center justify-center">
                  <FiMessageSquare size={18} className="text-primary-DEFAULT" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-fg">
                    Xidmət haqqında
                  </h3>

                  <p className="text-sm text-brand-muted-fg">Ətraflı məlumat</p>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-brand-fg leading-7 whitespace-pre-line">
                {service?.description}
              </div>
            </Box>

            {/* Categories */}
            <Box sx={{ mb: 2 }} className="card-surface p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                  <FiCheckCircle size={18} className="text-amber-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-fg">
                    Kateqoriyalar
                  </h3>

                  <p className="text-sm text-brand-muted-fg">Xidmət növləri</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {service?.categories.map((category) => (
                  <div
                    key={category}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-muted border border-brand-border text-sm font-medium text-brand-fg"
                  >
                    <span>{getCategoryTitle(category)}</span>
                  </div>
                ))}
              </div>
            </Box>
          </Grid>

          {/* RIGHT SIDEBAR */}
          <Grid spacing={2} size={{ xs: 12, md: 4 }}>
            {/* Mechanic */}
            <Box sx={{ mb: 2 }} className="card-surface p-5">
              <div className="flex items-center gap-3">
                {service && (
                  <ProfilePhotoWithChar title={service?.user.fullName} />
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Typography variant="h6">
                      {service?.user?.fullName}
                    </Typography>

                    <FiShield size={14} className="text-primary-DEFAULT" />
                  </div>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Peşəkar mexanik
                  </Typography>
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-3 mt-5"> */}
              <div className="rounded-xl bg-brand-bg border border-brand-border p-3 text-center mt-5">
                <p className="text-lg font-black text-brand-fg">
                  {specialistInfo?.experienceYears || 0}
                </p>

                <p className="text-xs text-brand-muted-fg mt-0.5">İl təcrübə</p>
              </div>

              {/* <div className="rounded-xl bg-brand-bg border border-brand-border p-3 text-center">
                  <p className="text-lg font-black text-primary-DEFAULT">VIP</p>

                  <p className="text-xs text-brand-muted-fg mt-0.5">Status</p>
                </div> */}
              {/* </div> */}

              <div className="space-y-3 mt-5">
                <Link
                  href={`/mechanic-info/${service?.userId}`}
                  className="block"
                >
                  <SubmitButton variant="contained" title="Ətraflı" />
                </Link>
              </div>
            </Box>

            {/* Safety */}
            <Box sx={{ mb: 2 }} className="card-surface p-5">
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-brand-muted-fg">
                  <FiCheckCircle
                    size={15}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />

                  <p>Birbaşa əlaqə imkanı</p>
                </div>

                <div className="flex items-start gap-2 text-sm text-brand-muted-fg">
                  <FiCheckCircle
                    size={15}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />

                  <p>Şəffaf qiymətləndirmə</p>
                </div>
              </div>
            </Box>

            {/* Meta */}
            <div className="card-surface p-5">
              <h3 className="text-sm font-bold text-brand-fg mb-4">
                Elan məlumatları
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-brand-muted-fg">ID</span>

                  <span className="text-sm font-semibold text-brand-fg font-mono">
                    #{service?.id}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-brand-muted-fg">
                    Paylaşılıb
                  </span>

                  <span className="text-sm font-semibold text-brand-fg">
                    {datePrettify(service?.createdAt || "", true)}
                  </span>
                </div>
              </div>
            </div>
            {isMyService && (
              <div className="card-surface p-5">
                <SubmitButton
                  onClick={() => setOptionsMenuOpen((prev) => !prev)}
                  startIcon={<FiSettings />}
                  title="Seçimlər"
                  variant="outlined"
                />
                {optionsMenuOpen && (
                  <>
                    <SubmitButton
                      color="primary"
                      title="Dəyiş"
                      onClick={() => setShowPostModal(true)}
                    />
                    <SubmitButton
                      color="error"
                      title="Sil"
                      onClick={() => setDeleteModalOpen(true)}
                    />
                  </>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </main>
      <AppModal
        open={deleteModalOpen}
        onClose={handleClose}
        title={"Silmək istədiyinizə əminsiniz?"}
        description={
          "Bu servisi sildikdən sonra bir daha geri qaytara bilməyəcəksiniz"
        }
        buttons={[
          {
            title: "Geri qayıt",
            onClick: handleClose,
          },
          {
            variant: "contained",
            title: "Sil",
            loading: onDeleteService.isPending,
            onClick: () => onDeleteService.mutate(),
          },
        ]}
      />
      {showPostModal && (
        <PostServiceModal
          initialService={service}
          onClose={() => setShowPostModal(false)}
        />
      )}
    </div>
  );
}
