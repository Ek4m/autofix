"use client";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";
import { FaWrench } from "react-icons/fa";

import Topbar from "@/components/Topbar";
import { useAuth } from "@/modules/auth/contexts";
import { PostServiceModal } from "@/modules/services/components/post";
import { useGetServices } from "@/modules/services/hooks/useGetServices";
import { IService } from "@/modules/services/types/interfaces";
import ServiceCard from "@/modules/services/components/card";
import ServicesHead from "@/modules/services/components/blocks/servicesHead";
import ServicesSearch from "@/modules/services/components/blocks/servicesSearch";
import { ServicesSearchContext } from "@/modules/services/contexts/servicesSearch";

export default function ServicesContainer() {
  const { setCategory, setSearch, search, category } = useContext(
    ServicesSearchContext,
  );
  const [showPostModal, setShowPostModal] = useState(false);
  const { data: services } = useGetServices({ search, category });

  return (
    <div className="min-h-screen bg-brand-bg">
      <Topbar />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <ServicesHead onShowPostModal={setShowPostModal} />
        <ServicesSearch />
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-brand-muted-fg">
            <span className="font-semibold text-brand-fg tabular-nums">
              {services?.length}
            </span>{" "}
            xidmət tapıldı
          </p>
          {(search || category) && (
            <button
              onClick={() => {
                setSearch("");
                setCategory(null);
              }}
              className="text-sm text-primary-DEFAULT font-medium hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <FiX size={13} /> Filtrləri sıfırla
            </button>
          )}
        </div>

        {services?.length === 0 ? (
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
            <button
              onClick={() => {
                setSearch("");
                setCategory(null);
              }}
              className="btn-primary"
            >
              Filtrləri sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {services?.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
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
