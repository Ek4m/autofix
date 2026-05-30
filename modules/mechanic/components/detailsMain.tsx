import { getCategoryTitle } from "@/helpers/getCategoryTitle";
import { getCityTitle } from "@/helpers/getCityTitle";
import { IService } from "@/modules/services/types/interfaces";
import { Box, Chip, Typography } from "@mui/material";
import React, { FC } from "react";
import {
  FiArchive,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";

const DetailsMain: FC<{ service: IService }> = ({ service }) => {
  const priceText = `${service.priceMin} ₼ - ${service.priceMax} ₼`;
  const specialistInfo = service?.user.specialistInfo;

  return (
    <>
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
              {service.isActive ? (
                <Chip
                  icon={<FiCheckCircle size={12} />}
                  label="Aktiv"
                  color="success"
                />
              ) : (
                <Chip
                  icon={<FiArchive size={12} />}
                  label="Arxivlənmiş"
                  color="default"
                />
              )}
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
                  new Date(service?.createdAt).toLocaleDateString("az-AZ")}
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
            <h3 className="text-lg font-bold text-brand-fg">Xidmət haqqında</h3>

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
            <h3 className="text-lg font-bold text-brand-fg">Kateqoriyalar</h3>

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
    </>
  );
};

export default DetailsMain;
