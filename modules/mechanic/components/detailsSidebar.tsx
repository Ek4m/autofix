"use client";
import AppModal from "@/components/ui/modal";
import ProfilePhotoWithChar from "@/components/ui/profilePhotoWithChar";
import SubmitButton from "@/components/ui/submitButton";
import { datePrettify } from "@/helpers/datePrettify";
import { useAuth } from "@/modules/auth/contexts";
import {
  deleteService,
  toggleServiceActivation,
} from "@/modules/profile/services";
import { PostServiceModal } from "@/modules/services/components/post";
import { IService } from "@/modules/services/types/interfaces";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import {
  FiCheckCircle,
  FiEdit,
  FiSettings,
  FiShield,
  FiTrash,
} from "react-icons/fi";

const DetailsSidebar: FC<{ service: IService }> = ({ service }) => {
  console.log(service);
  const { user } = useAuth();
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const specialistInfo = service?.user.specialistInfo;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const isMyService = user?.id === service?.userId;
  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const onDeleteService = useMutation({
    mutationFn: async () => {
      try {
        await deleteService(service.id);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onToggleActive = useMutation({
    mutationFn: async () => {
      try {
        await toggleServiceActivation(service.id);
        navigation.reload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Box sx={{ mb: 2 }} className="card-surface p-5">
        <div className="flex items-center gap-3">
          {service && <ProfilePhotoWithChar title={service?.user.fullName} />}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Typography variant="h6">{service?.user?.fullName}</Typography>

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
          <Link href={`/mechanic-info/${service?.userId}`} className="block">
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
            <span className="text-sm text-brand-muted-fg">Paylaşılıb</span>

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
            variant="contained"
          />
          {optionsMenuOpen && (
            <>
              <SubmitButton
                color="primary"
                title="Dəyiş"
                startIcon={<FiEdit />}
                onClick={() => setShowPostModal(true)}
              />
              <SubmitButton
                color="error"
                title="Sil"
                startIcon={<FiTrash />}
                onClick={() => setDeleteModalOpen(true)}
              />
              <SubmitButton
                color="info"
                loading={onToggleActive.isPending}
                title={service.isActive ? "Deaktivləşdir" : "Aktivləşdir"}
                startIcon={service.isActive ? <BsToggleOff /> : <BsToggleOn />}
                onClick={() => onToggleActive.mutate()}
              />
            </>
          )}
        </div>
      )}
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
    </>
  );
};

export default DetailsSidebar;
