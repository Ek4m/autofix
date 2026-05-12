"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { FaAward, FaMapMarkerAlt, FaPhone, FaWrench } from "react-icons/fa";

import { useGetMechanicInfo } from "../hooks/useGetMechanicInfo";
import categoriesList from "@/data/categories.json";
import parsePhoneNumber from "libphonenumber-js";
import { toast } from "sonner";
import { useGetServices } from "@/modules/services/hooks/useGetServices";
import ServiceCard from "@/modules/services/components/card";

const MechanicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetMechanicInfo(id);

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

  const onCopyPhoneNumber = () => {
    if (!data) return;
    const formattedNumber = parsePhoneNumber(
      "+" + data.phoneNumber,
    )?.formatInternational();
    if (formattedNumber) {
      navigator.clipboard.writeText(formattedNumber);
      toast.success("Nömrə kopyalandı");
    }
  };

  const { data: services, isFetching: isFetchingServices } = useGetServices({
    mechanic: id,
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 bg-white">
      <Typography variant="h4" sx={{ fontWeight: "600" }}>
        Usta Profili
      </Typography>

      <div className="p-5 space-y-6">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-120 h-120 rounded bg-[lightgrey] p-2">
              {data?.specialistInfo?.objectName
                .split(" ")
                .map((c) => c[0].toUpperCase())
                .join("")}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-brand-fg">
                {data?.fullName}
              </h3>
            </div>
            <p className="text-sm text-brand-muted-fg mt-0.5">
              {data?.specialistInfo?.objectName}
            </p>
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
              value: 1,
              Icon: FaWrench,
            },
            {
              label: "Əlaqə nömrəsi",
              value: parsePhoneNumber(
                "+" + data?.phoneNumber,
              )?.formatInternational(),
              Icon: FaPhone,
              onClick: onCopyPhoneNumber,
            },
          ].map((stat) => (
            <div
              role={stat.onClick ? "button" : undefined}
              onClick={stat.onClick}
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
          <h4 className="text-lg font-bold text-brand-fg">Ətraflı</h4>
          <p>{data?.specialistInfo?.bio}</p>
        </div>
        <div className="space-y-2.5">
          <h4 className="text-lg font-bold text-brand-fg">Digər məlumatlar</h4>

          <div className="flex items-center gap-2 p-3">
            <FaMapMarkerAlt
              size={20}
              className="text-primary-DEFAULT shrink-0"
            />
            <span className="text-md text-brand-fg">
              {data?.specialistInfo?.rawAddress}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3">
            <a
              href={data?.specialistInfo?.locationUrl}
              target="_blank"
              className="text-md text-brand-fg underline text-primary flex items-center gap-1"
            >
              Xəritədə göstər
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-brand-fg mb-2.5">İxtisaslar</h4>
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
      <br />
      <Divider />
      <br />
      <Typography variant="h4" sx={{ fontWeight: "600" }}>
        Xidmətlər
      </Typography>
      {isFetchingServices && (
        <div className="p-16 text-center">
          <CircularProgress size={100} />
        </div>
      )}
      {services && services.length === 0 && !isFetchingServices && (
        <div className="card-surface p-16 text-center">
          <FaWrench size={48} className="mx-auto text-brand-muted-fg/40 mb-4" />
          <h3 className="text-lg font-bold text-brand-fg mb-2">
            Heç bir xidmət tapılmadı
          </h3>
        </div>
      )}
      <Grid container spacing={3} className="mt-2">
        {services?.map((service) => (
          <Grid key={service.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MechanicDetails;
