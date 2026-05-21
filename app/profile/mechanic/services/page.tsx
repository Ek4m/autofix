"use client";

import React, { useState } from "react";
import Topbar from "@/components/Topbar";
import { useGetMechanicServices } from "@/modules/profile/hooks/useGetMechanicServices";
import ServicesHead from "@/modules/services/components/blocks/servicesHead";
import { FaWrench } from "react-icons/fa";
import ServiceCard from "@/modules/services/components/card";
import { PostServiceModal } from "@/modules/services/components/post";
import { Box, CircularProgress } from "@mui/material";

export default function MechanicServiceListingsPage() {
  const [showPostModal, setShowPostModal] = useState(false);
  const { data, isFetching } = useGetMechanicServices();
  return (
    <div className="min-h-screen bg-brand-bg">
      <Topbar />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <ServicesHead
          title="Xidmətləriniz"
          description="Xidmətlərinizə buradan baxa bilərsiniz"
          onShowPostModal={setShowPostModal}
        />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-brand-muted-fg">
            <span className="font-semibold text-brand-fg tabular-nums">
              {data?.length}
            </span>{" "}
            xidmət tapıldı
          </p>
        </div>
        {isFetching && (
          <Box
            sx={{
              display: "flex",
              alignItems: "'center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {data?.length === 0 ? (
          <div className="card-surface p-16 text-center">
            <FaWrench
              size={48}
              className="mx-auto text-brand-muted-fg/40 mb-4"
            />
            <h3 className="text-lg font-bold text-brand-fg mb-2">
              Heç bir xidmət tapılmadı
            </h3>
            <p className="text-sm text-brand-muted-fg mb-4">
              Filtrləri dəyişdirin və ya axtarış sözünü silin
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </main>
      {showPostModal && (
        <PostServiceModal onClose={() => setShowPostModal(false)} />
      )}
    </div>
  );
}
