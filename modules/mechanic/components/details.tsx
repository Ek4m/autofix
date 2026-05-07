"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FaAward, FaMapMarkerAlt, FaPhone, FaWrench } from "react-icons/fa";

import AppImage from "@/components/ui/AppImage";
import { MECHANIC_SERVICES } from "@/lib/mockData";
import { useGetMechanicInfo } from "../hooks/useGetMechanicInfo";
import categoriesList from "@/data/categories.json";

const MechanicDetails = () => {
  const service = MECHANIC_SERVICES[0];
  const { id } = useParams<{ id: string }>();
  const { data } = useGetMechanicInfo(id);

  const tServices = useTranslations("services");
  const allServices = MECHANIC_SERVICES.filter(
    (s) => s.mechanicId === service.mechanicId,
  );

  const categories = useMemo(() => {
    const flatArray = categoriesList.flatMap((cat) =>
      cat.subcategories.map((c) => ({
        ...c,
        name: `${cat.name} / ${c.name}`,
      })),
    );
    return flatArray.filter((c) =>
      data?.specialistInfo?.profession.includes(c.id),
    );
  }, [data]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 bg-white">
      <Typography variant="h4" sx={{ fontWeight: "600" }}>
        Mexanik Profili
      </Typography>

      <div className="p-5 space-y-6">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <AppImage
              src={service.mechanicAvatar}
              alt={`${service.mechanicName} tam profil şəkli`}
              width={72}
              height={72}
              className="rounded-2xl border border-brand-border"
            />
            {/* {service.isAvailable && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <FaCheckCircle size={11} className="text-white" />
              </span>
            )} */}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-brand-fg">
                {data?.fullName}
              </h3>
              {/* {service.isVerified && (
                <span className="badge-verified">
                  <FaShieldAlt size={11} /> {tServices("verified")}
                </span>
              )} */}
            </div>
            <p className="text-sm text-brand-muted-fg mt-0.5">
              {data?.specialistInfo?.objectName}
            </p>
            {/* <div className="flex items-center gap-1 mt-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar
                  key={`star-${service.id}-${s}`}
                  size={14}
                  className={
                    s <= Math.floor(service.rating)
                      ? "text-amber-400"
                      : "text-brand-muted"
                  }
                />
              ))}
              <span className="ml-1 text-sm font-bold text-brand-fg tabular-nums">
                {service.rating}
              </span>
              <span className="text-sm text-brand-muted-fg">
                ({service.reviewCount} {tServices("reviews")})
              </span>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Təcrübə",
              value: `${data?.specialistInfo?.experienceYears} il`,
              Icon: FaAward,
            },
            {
              label: "Xidmətlər",
              value: `${allServices.length}`,
              Icon: FaWrench,
            },
            {
              label: "Əlaqə nömrəsi",
              value: data?.phoneNumber,
              Icon: FaPhone,
            },
          ].map((stat) => (
            <div
              key={`pstat-${stat.label}`}
              className="bg-brand-bg rounded-xl p-3.5 text-center"
            >
              <stat.Icon
                size={18}
                className={`mx-auto mb-1.5 "text-primary-DEFAULT`}
              />
              <p className={`text-sm font-bold text-brand-fg tabular-nums`}>
                {stat.value}
              </p>
              <p className="text-xs text-brand-muted-fg mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          <h4 className="text-sm font-bold text-brand-fg">Digər məlumatlar</h4>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <div className="flex items-center gap-3 p-3 bg-brand-bg rounded-xl border border-brand-border">
                <FaMapMarkerAlt
                  size={16}
                  className="text-primary-DEFAULT shrink-0"
                />
                <span className="text-sm text-brand-fg">
                  {data?.specialistInfo?.bio}
                </span>
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <div className="flex items-center gap-3 p-3 bg-brand-bg rounded-xl border border-brand-border">
                <FaMapMarkerAlt
                  size={16}
                  className="text-primary-DEFAULT shrink-0"
                />
                <a
                  href={data?.specialistInfo?.locationUrl}
                  target="_blank"
                  className="text-sm text-brand-fg"
                >
                  {data?.specialistInfo?.locationUrl}
                </a>
              </div>
            </Grid>
          </Grid>
        </div>

        <div>
          <h4 className="text-sm font-bold text-brand-fg mb-2.5">İxtisaslar</h4>
          <div className="flex gap-2 flex-wrap">
            {categories.map((spec) => (
              <span
                key={spec.id}
                className="text-sm bg-primary-DEFAULT/10 text-primary-DEFAULT rounded-full px-3 py-1 font-medium border border-primary-DEFAULT/20"
              >
                {spec.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-brand-border px-5 py-4">
        <button
          onClick={() => {}}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3"
        >
          <FaPhone size={15} />
          {tServices("contact")} — {data?.phoneNumber}
        </button>
      </div>
    </div>
  );
};

export default MechanicDetails;
